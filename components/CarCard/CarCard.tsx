'use client';

import Image from "next/image";
import Link from "next/link";
import { Car } from "@/types/car";

import css from "./CarCard.module.css";

interface Props {
  car: Car;
};

 function CarCard({ car }: Props) {
  const addressParts = car.address.split(", ");
  const city = addressParts[1];
  const country = addressParts[2];

  const mileage = car.mileage.toLocaleString('uk-UA');

  return (
    <li className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          className={css.carImage}
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={276}
          height={268}
          priority
        />
      </div>
      <div className={css.content}>
        <div className={css.topRow}>
          <h3 className={css.title}>
            {car.brand}{" "}
            <span className={css.model}>{car.model}</span>, {car.year}
          </h3>

          <p className={css.price}>{car.rentalPrice}</p>
        </div>

        <p className={css.meta}>
          {city} | {country} | {car.rentalCompany}
        </p>

        <p className={css.meta}>
          {car.type} | {mileage} km
        </p>
      </div>
      <Link href={`/catalog/${car.id}`} className={css.button}>
        Read more
      </Link>
    </li>
  );
}

export default CarCard;