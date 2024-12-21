const HomeUserCard = ({ imgUrl, username, email }: { imgUrl: string, username: string, email: string }) => {
    return (
        <div className="flex gap-3 m-0">
            <div className="flex justify-start items-center col-span-2">
                <img src={imgUrl} alt="User profile picture" className="w-8 h-8 rounded-full" />
            </div>
            <div className="flex flex-col justify-center items-start col-span-10">
                <p className="text-sm font-medium leading-none">{username}</p>
                <p className="text-sm text-muted-foreground">{email}</p>
            </div>
        </div>
    )
}

export default HomeUserCard