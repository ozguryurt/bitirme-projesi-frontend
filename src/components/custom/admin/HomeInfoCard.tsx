import React from 'react'

const HomeInfoCard = ({ title, icon: Icon, count, subtitle }: { title: string, icon: React.ComponentType<any>, count: string, subtitle: string }) => {
    return (
        <div className="rounded-md p-3 border">
            <div className="flex justify-between items-center pb-2">
                <div className="tracking-tight text-sm font-medium">
                    {title}
                </div>
                <Icon size={17} /> {/* Icon bileşenini burada render ediyoruz */}
            </div>
            <div className="text-2xl font-bold">
                {count}
            </div>
            <div className="text-xs text-muted-foreground">
                {subtitle}
            </div>
        </div>
    )
}

export default HomeInfoCard