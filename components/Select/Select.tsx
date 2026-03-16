'use client';

import { useEffect, useState, useRef } from 'react';
import css from './Select.module.css';

interface Option {
  value: string;
  label: string;
  menuLabel?: string;
}

interface SelectProps {
  id?: string;
  value: string;
  placeholder: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
}

function Select({ id, value, placeholder, options, onChange, className = '' }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = value ? options.find(option => option.value === value) : undefined;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setHighlightedIndex(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex(prev => (prev === null || prev === options.length - 1 ? 0 : prev + 1));
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex(prev => (prev === null || prev === 0 ? options.length - 1 : prev - 1));
    }

    if (event.key === 'Enter' && highlightedIndex !== null) {
      event.preventDefault();
      handleSelect(options[highlightedIndex].value);
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className={`${css.selectWrapper} ${className}`}>
      <button
        id={id}
        type="button"
        className={`${css.selectTrigger} ${isOpen ? css.open : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={selectedOption ? css.value : css.placeholder}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <span className={css.selectActions}>
          {selectedOption && (
            <span
              role="button"
              className={css.clearBtn}
              onClick={e => {
                e.stopPropagation();
                onChange('');
                setIsOpen(false);
              }}
            >
              ×
            </span>
          )}

          <svg className={`${css.icon} ${isOpen ? css.iconOpen : ''}`}>
            <use href="/sprite.svg#icon-chevron-down" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul className={css.selectDropdown} role="listbox">
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isHighlighted = index === highlightedIndex;

            return (
              <li key={option.value}>
                <button
                  type="button"
                  className={`${css.selectOption} ${
                    isSelected ? css.selectOptionActive : ''
                  } ${isHighlighted ? css.highlighted : ''}`}
                  onClick={() => handleSelect(option.value)}
                  role="option"
                  aria-selected={isSelected}
                >
                  {option.menuLabel ?? option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Select;
