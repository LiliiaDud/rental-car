import css from './CarDetails.module.css';
import { Car } from '@/types/car';
import Image from 'next/image';
import BookingForm from '../BookingForm/BookingForm';

interface CarDetailsProps {
  car: Car;
}

function CarDetails({ car }: CarDetailsProps) {
  const shortId = String(car.id).slice(-4);
  const [, city, country] = car.address.split(', ');
  const mileage = car.mileage.toLocaleString('uk-UA');
  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.wrapper}>
          <div className={css.left}>
            <div className={css.imageWrapper}>
              <Image
                className={css.img}
                src={car.img}
                alt={`${car.brand} ${car.model}`}
                width={640}
                height={512}
                priority
              />
            </div>
            <BookingForm />
          </div>
          <div className={css.right}>
            <div className={css.head}>
              <h1 className={css.title}>
                {car.brand} {car.model} ({car.year})<span className={css.id}>Id: {shortId}</span>
              </h1>
              <div className={css.meta}>
                <p className={css.metaItem}>
                  <svg className={css.metaIcon}>
                    <use href="/sprite.svg#icon-local" />
                  </svg>
                  {city}, {country}
                </p>

                <p className={css.metaItem}>Mileage: {mileage} km</p>
              </div>
              <p className={css.price}>${car.rentalPrice}</p>
              <p className={css.description}>{car.description}</p>
            </div>

            <div className={css.block}>
              <h2 className={css.subtitle}>Rental Conditions:</h2>
              <ul className={css.list}>
                {car.rentalConditions.map(condition => (
                  <li key={condition} className={css.item}>
                    <svg className={css.icon} aria-hidden="true">
                      <use href="/sprite.svg#icon-check-circle" />
                    </svg>
                    {condition}
                  </li>
                ))}
              </ul>
            </div>

            <div className={css.block}>
              <h2 className={css.subtitle}>Car Specifications:</h2>
              <ul className={css.list}>
                <li className={css.item}>
                  <svg className={css.icon} aria-hidden="true">
                    <use href="/sprite.svg#icon-calendar" />
                  </svg>
                  Year: {car.year}
                </li>
                <li className={css.item}>
                  <svg className={css.icon}>
                    <use href="/sprite.svg#icon-car" />
                  </svg>
                  Type: {car.type}
                </li>
                <li className={css.item}>
                  <svg className={css.icon}>
                    <use href="/sprite.svg#icon-fuel-pump" />
                  </svg>
                  Fuel Consumption: {car.fuelConsumption}
                </li>
                <li className={css.item}>
                  <svg className={css.icon}>
                    <use href="/sprite.svg#icon-gear" />
                  </svg>
                  Engine Size: {car.engineSize}
                </li>
              </ul>
            </div>

            <div className={css.block}>
              <h2 className={css.subtitle}>Accessories and functionalities:</h2>
              <ul className={css.list}>
                {[...car.accessories, ...car.functionalities].map(item => (
                  <li key={item} className={css.item}>
                    <svg className={css.icon} aria-hidden="true">
                      <use href="/sprite.svg#icon-check-circle" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CarDetails;
