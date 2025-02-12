interface Props{
    store:store,
    setModalOpen(flag:boolean):void
}

const SupportModal:React.FC<Props> = ({store, setModalOpen}) => {
    return (
        <div>모달</div>
    );
}
    
export default SupportModal;
    