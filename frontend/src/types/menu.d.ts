interface menu {
    icon: JSX.Element,
	headerName : string,
    url: string
	items : {
        name: string,
        url:string,
        viewYn:boolean
    }[],
}