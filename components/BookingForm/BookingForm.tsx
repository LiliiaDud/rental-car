'use client';

import { ChangeEvent, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import css from './BookingForm.module.css';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { enGB } from 'date-fns/locale';

registerLocale('enGB', enGB);

interface BookingFormValues {
  name: string;
  email: string;
  date: string;
  comment: string;
}

const BookingFormSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string().trim().email('Enter a valid email').required('Email is required'),
  date: Yup.string().required('Booking date is required'),
  comment: Yup.string().trim().max(500, 'Comment is too long'),
});

const initialValues: BookingFormValues = {
  name: '',
  email: '',
  date: '',
  comment: '',
};

function BookingForm() {
  const [values, setValues] = useState<BookingFormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setValues(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (formData: FormData) => {
    const formValues: BookingFormValues = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      date: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
      comment: formData.get('comment') as string,
    };

    try {
      setErrors({});
      await BookingFormSchema.validate(formValues, { abortEarly: false });

      setValues(initialValues);
      setSelectedDate(null);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const formErrors: Record<string, string> = {};

        err.inner.forEach((error: Yup.ValidationError) => {
          if (error.path) {
            formErrors[error.path] = error.message;
          }
        });

        setErrors(formErrors);
      }
    }
  };

  return (
    <section className={css.booking}>
      <h2 className={css.title}>Book your car now</h2>
      <p className={css.subtitle}>Stay connected! We are always ready to help you.</p>
      <form action={handleSubmit} className={css.form}>
        <div className={css.fieldWrapper}>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Name*"
            className={css.input}
          />
          {errors.name && <span className={css.error}>{errors.name}</span>}
        </div>

        <div className={css.fieldWrapper}>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email*"
            className={css.input}
          />
          {errors.email && <span className={css.error}>{errors.email}</span>}
        </div>

        <div className={css.fieldWrapper}>
          <DatePicker
            name="date"
            selected={selectedDate}
            onChange={(date: Date | null) => {
              setSelectedDate(date);

              if (errors.date) {
                setErrors(prev => ({
                  ...prev,
                  date: '',
                }));
              }
            }}
            placeholderText="Booking date"
            className={css.input}
            dateFormat="yyyy-MM-dd"
            calendarClassName={css.calendar}
            popperClassName={css.popper}
            minDate={new Date()}
            locale="enGB"
            formatWeekDay={nameOfDay => nameOfDay.slice(0, 3)}
          />
          {errors.date && <span className={css.error}>{errors.date}</span>}
        </div>

        <div className={css.fieldWrapper}>
          <textarea
            className={css.textarea}
            name="comment"
            placeholder="Comment"
            value={values.comment}
            onChange={handleChange}
            rows={3}
          />
          {errors.comment && <span className={css.error}>{errors.comment}</span>}
        </div>

        <button type="submit" className={css.button}>
          Send
        </button>
      </form>
    </section>
  );
}

export default BookingForm;
