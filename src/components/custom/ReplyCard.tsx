import { Link } from "react-router"
import Divider from "./Divider"
import { ChevronsDown, ChevronsUp } from "lucide-react"

const ReplyCard = () => {
    return (
        <>
            <div className="w-full flex flex-col gap-3 rounded-md border p-5">
                <Link to={`/profil/10`} className="flex justify-start items-center gap-2">
                    <img src="https://www.gravatar.com/avatar/0dde57a178da66520b18e3a737b6d6ed?s=80&d=mp&r=g" alt="User profile picture" className="w-14 h-14 rounded-full" />
                    <div className="w-full flex flex-col justify-center items-start">
                        <p className="w-full truncate font-medium">
                            username
                        </p>
                        <p className="w-full truncate text-xs font-medium text-start">
                            1 saat önce
                        </p>
                    </div>
                </Link>
                <div className="reply-content">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam, saepe fugiat deserunt nisi, hic earum velit eius alias delectus quibusdam veniam. Hic quod inventore excepturi!
                </div>
                <Divider />
                <div className="w-full flex justify-start items-center gap-3">
                    <div className="flex justify-center items-center gap-1 cursor-pointer">
                        <ChevronsUp className="text-green-500"/>
                        <span className="text-xs font-medium">7</span>
                    </div>
                    <div className="flex justify-center items-center gap-1 cursor-pointer">
                        <ChevronsDown className="text-red-500" />
                        <span className="text-xs font-medium">4</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReplyCard