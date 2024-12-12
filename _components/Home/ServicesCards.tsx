import ServiceCard from "@/_components/Home/ServiceCard";

export default function ServiceCards() {

  return (
    <div className="container mx-auto my-2">
      <h3>Виды сервисных работ</h3>
      <div className="services-cards">
        <ServiceCard/>
        <ServiceCard/>
        <ServiceCard/>
      </div>
    </div>
  )
}