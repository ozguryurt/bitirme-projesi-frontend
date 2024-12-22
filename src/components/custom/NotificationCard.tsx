import { Bell } from "lucide-react";
import { Link } from "react-router";

const NotificationCard = ({ title, description, to }: { title: string; description: string; to?: string }) => {
    return to ? (
        <Link to={to} className="flex items-center space-x-4 rounded-md p-1 cursor-pointer w-full">
            <Bell />
            <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium leading-none truncate">
                    {title}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                    {description}
                </p>
            </div>
        </Link>
    ) : (
        <div className="flex items-center space-x-4 rounded-md p-1 cursor-pointer w-full">
            <Bell />
            <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium leading-none truncate">
                    {title}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default NotificationCard;