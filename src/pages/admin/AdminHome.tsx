import { Reply, ShieldQuestion, User } from "lucide-react"

const AdminHome = () => {
  return (
    <div className="w-full min-h-screen px-5 lg:px-24 py-5 shadow">
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="grid grid-cols-6 rounded-md border p-2 gap-2">
          <div className="flex justify-center items-center col-span-2 gap-2">
            <User size={75}/>
          </div>
          <div className="flex flex-col justify-center items-start col-span-4 gap-2">
            <span className="font-bold text-3xl text-start">Üyeler</span>
            <span className="font-medium text-base text-start">1024</span>
          </div>
        </div>
        <div className="grid grid-cols-6 rounded-md border p-2 gap-2">
          <div className="flex justify-center items-center col-span-2 gap-2">
            <ShieldQuestion size={75}/>
          </div>
          <div className="flex flex-col justify-center items-start col-span-4 gap-2">
            <span className="font-bold text-3xl text-start">Sorular</span>
            <span className="font-medium text-base text-start">1024</span>
          </div>
        </div>
        <div className="grid grid-cols-6 rounded-md border p-2 gap-2">
          <div className="flex justify-center items-center col-span-2 gap-2">
            <Reply size={75}/>
          </div>
          <div className="flex flex-col justify-center items-start col-span-4 gap-2">
            <span className="font-bold text-3xl text-start">Cevaplar</span>
            <span className="font-medium text-base text-start">1024</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome