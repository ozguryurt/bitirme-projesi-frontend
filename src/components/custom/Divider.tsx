const Divider = ({ customClass }: { customClass?: string }) => {
    return (
        <div className={`w-full h-[1px] bg-slate-200 dark:opacity-25 my-1 lg:my-5 ${customClass}`}></div>
    )
}

export default Divider