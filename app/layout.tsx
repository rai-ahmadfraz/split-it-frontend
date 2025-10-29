import Header from "@/Components/header"
import './global.css'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Header/>
        {children}
        </body>
    </html>
  )
}