import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBoardDetail_s } from '../../services/board';
import { AdminBoardInfo, AdminBoardModifyModal } from '../../components';
import { useTranslation } from 'react-i18next';

const AdminBoardDetail: React.FC = () => {
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [board, setBoard] = useState<boardDetail | undefined>(undefined);
    const params = useParams<{id:string}>();
    const modalRef = useRef<HTMLDivElement>(null);
    const getBoardDetail = useCallback (async () => {
        try {
            if (params.id !== undefined){
                const boardDetail : boardDetail = await getBoardDetail_s(params.id);
                setBoard(boardDetail);
            }
        } catch (error) {
            console.error('Error fetching boardDetail:', error);
        }
    }, [params.id]);

    useEffect(() => {
    getBoardDetail(); // 비동기 함수 호출
    }, [getBoardDetail]);

    if (!board) {
        return (
            <div>
                <h1>{t("AdminBoard:Detail.Option.Attribute00")}</h1>
            </div>
        );
    }

    return (
        <div>
            <h1>{board.title} <button onClick={() => setModalOpen(true)}>수정</button></h1>
            {
                modalOpen && 
                <div 
                ref={modalRef}
                style={{
                "width": "100%",
                "height": "100%",
                "position": "fixed",
                "top": "0",
                "left": "0",
                "display": "flex",
                "background": "rgba(0, 0, 0, 0.5)"
                }}><AdminBoardModifyModal boardDetail={board} setModalOpen={setModalOpen}/></div>
            }
            <AdminBoardInfo board={board}></AdminBoardInfo>
        </div>
    );
};

export default AdminBoardDetail;
