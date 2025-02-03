package com.zon.abba.auth.service;


import com.zon.abba.auth.entity.Auth;
import com.zon.abba.auth.entity.Role;
import com.zon.abba.auth.entity.RoleDetail;
import com.zon.abba.auth.repository.AuthRepository;
import com.zon.abba.auth.repository.RoleDetailRepository;
import com.zon.abba.auth.repository.RoleRepository;
import com.zon.abba.auth.request.RoleAddRequest;
import com.zon.abba.auth.response.RoleListResponse;
import com.zon.abba.auth.response.RoleListDetail;
import com.zon.abba.common.exception.CommonException;
import com.zon.abba.common.exception.ErrorCode;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseDataBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final AuthRepository authRepository;
    private final RoleRepository roleRepository;
    private final RoleDetailRepository roleDetailRepository;
    private final MemberRepository memberRepository;

    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public ResponseListBody authList(){
        logger.info("권한 리스트를 반환합니다.");

        List<RoleListResponse> roleListResponses = roleRepository.findAllRoles();

        List<RoleListResponse> list = roleListResponses.stream().map(roleListResponse -> {
            List<RoleListDetail> details = roleRepository.findAuthDetailsByRoleId(roleListResponse.getRoleID());
            roleListResponse.setRoleDetail(details);
            return roleListResponse;
        }).collect(Collectors.toList());

        logger.info("권한 리스트를 반환을 완료합니다.");

        return new ResponseListBody((long) list.size(), list);
    }

    @Transactional
    public ResponseDataBody registerAuth(RoleAddRequest roleAddRequest){
        logger.info("권한을 등록합니다.");

        logger.info("유저 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("204", "없는 회원입니다."));
        
        // 메뉴 아이디들이 다 있는건지 확인
        List<Auth> authList = authRepository.findByAuthIdIn(roleAddRequest.getAuthIDList());

        if(authList.stream().count() != roleAddRequest.getAuthIDList().size()){
            throw new CommonException(ErrorCode.NO_MENU);
        }

        // 다 있으면 그대로 등록하고 결과 리턴

        // 1. Role 생성 및 저장
        Role role = new Role();
        role.setRoleName(roleAddRequest.getRoleName());
        /*final Role role = roleRepository.save(
                Role.builder()
                        //.roleId(UUID.randomUUID().toString()) // UUID 생성
                        .roleName(roleAddRequest.getRoleName())
                        .build()
        );*/

        roleRepository.save(role);

        // 2. Auth ID 리스트를 조회 후 RoleDetail 생성
        List<RoleDetail> roleDetails = new ArrayList<>();

        for (Auth auth : authList) {
            RoleDetail detail = new RoleDetail();
            detail.setAuth(auth);
            detail.setRole(role);
            roleDetails.add(detail);
        }

        role.setRoleDetails(roleDetails);

        roleDetailRepository.saveAll(roleDetails);

        // 3. RoleDetail 저장
        logger.info("권한을 등록합니다.");

        logger.info("권한 등록을 완료했습니다.");
        //return new ResponseBody("성공했습니다.");

        return new ResponseDataBody("성공했습니다.", role.getRoleId());
    }


    @Transactional
    public void deleteRole(String roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("해당 Role이 존재하지 않습니다: " + roleId));

        roleRepository.delete(role);
    }

}
