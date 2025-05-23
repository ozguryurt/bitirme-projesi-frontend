import React from 'react'

const HomeInfoCard = ({ title, icon: Icon, count }: { title: string, icon: React.ComponentType<any>, count: string }) => {
    return (
        <div className="rounded-md p-3 border">
            <div className="flex justify-between items-center pb-2">
                <div className="tracking-tight text-xl font-medium">
                    {title}
                </div>
                <Icon size={30} />
            </div>
            <div className="text-3xl font-bold">
                {count}
            </div>
        </div>
    )
}

export default HomeInfoCard