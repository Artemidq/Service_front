import {HiMiniComputerDesktop} from "react-icons/hi2";
import Image from "next/image";

export default function ServiceCard() {

  return (
    <div className="card">
      <div className="flex items-center">
        <h6>Компьютерные комплектующие:</h6>
      </div>
      <select className="my-2">
        <option>Видеокарта</option>
        <option>Видеокарта</option>
        <option>Видеокарта</option>
        <option>Видеокарта</option>
        <option>Видеокарта</option>
      </select>
    </div>
  )
}