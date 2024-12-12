import RegisterOrUpdate from "@/_components/RegisterOrUpdate";
import Header from "@/_components/Header";


export default function Register() {
  return (
    <main>
      <Header/>
      <RegisterOrUpdate isUpdate={false}/>
    </main>
  )
}