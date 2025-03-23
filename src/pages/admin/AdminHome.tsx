import { Reply, ShieldQuestion, Users } from "lucide-react"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import HomeInfoCard from "@/components/custom/admin/HomeInfoCard"
import HomeUserCard from "@/components/custom/admin/HomeUserCard"
import { useAdmin } from "@/hooks/admin/useAdmin"
import UserType from "@/types/UserType"

const chartData = [
  { ay: "Ocak", sorular: 186, cevaplar: 80 },
  { ay: "Şubat", sorular: 305, cevaplar: 200 },
  { ay: "Mart", sorular: 237, cevaplar: 120 },
  { ay: "Nisan", sorular: 73, cevaplar: 190 },
  { ay: "Mayıs", sorular: 209, cevaplar: 130 },
  { ay: "Haziran", sorular: 214, cevaplar: 140 },
]

const chartConfig = {
  sorular: {
    label: "Sorular",
    color: "#2563eb",
  },
  cevaplar: {
    label: "Cevaplar",
    color: "#60a5fa",
  },
} satisfies ChartConfig

const AdminHome = () => {

  const { getUsers, getQuestions } = useAdmin()
  const { users, usersIsLoading, usersIsError } = getUsers()
  const { questions, questionsIsLoading, questionsIsError } = getQuestions()

  return (
    <div className="w-full flex flex-col justify-center items-center gap-12 px-5 lg:px-24 py-5">
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3">
        <HomeInfoCard
          title={`Kullanıcılar`}
          icon={Users}
          count={users?.length.toString()!}
          subtitle={`Son 1 ayda %20.1 artış`}
        />
        <HomeInfoCard
          title={`Sorular`}
          icon={ShieldQuestion}
          count={questions?.length.toString()!}
          subtitle={`Son 1 ayda %20.1 artış`}
        />
        <HomeInfoCard
          title={`Cevaplar`}
          icon={Reply}
          count={`1.300`}
          subtitle={`Son 1 ayda %20.1 artış`}
        />
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="w-full bg-card text-card-foreground">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="ay"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="sorular" fill="var(--color-sorular)" radius={4} />
              <Bar dataKey="cevaplar" fill="var(--color-cevaplar)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="w-full bg-card text-card-foreground">
          <div className="w-full rounded-md p-3 border space-y-5">
            <div className="pb-2">
              <div className="font-semibold leading-none tracking-tight">Son üyeler</div>
              <div className="text-sm text-muted-foreground">Bu ay yeni 150 üye katıldı.</div>
            </div>
            {
              users?.slice(0, 5).map((user: UserType, index: number) => {
                return (
                  <HomeUserCard
                    key={index}
                    imgUrl={`${import.meta.env.VITE_IMAGE_BASEPATH}/${user.avatar}`}
                    username={user.nickname}
                    email={user.email}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome