import React, { useEffect, useId, useRef, useState } from 'react';

function CustomSelect({ value, onChange, options, placeholder = 'Selecciona una opcion', disabled = false }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const listId = useId();

  const selectedOption = options.find((option) => String(option.value) === String(value));

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  function toggleOpen() {
    if (disabled) {
      return;
    }

    setOpen((current) => !current);
  }

  function handleSelect(nextValue) {
    onChange(nextValue);
    setOpen(false);
  }

  return (
    <div className={`panel-custom-select ${open ? 'is-open' : ''} ${disabled ? 'is-disabled' : ''}`} ref={rootRef}>
      <button
        className="panel-custom-select__trigger"
        type="button"
        onClick={toggleOpen}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        disabled={disabled}
      >
        <span className={`panel-custom-select__value ${selectedOption ? '' : 'is-placeholder'}`}>
          {selectedOption?.label ?? placeholder}
        </span>
        <i className={`fa-solid fa-chevron-down panel-custom-select__icon ${open ? 'is-open' : ''}`}></i>
      </button>

      {open && (
        <div className="panel-custom-select__menu" role="listbox" id={listId}>
          {options.map((option) => {
            const isSelected = String(option.value) === String(value);

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`panel-custom-select__option ${isSelected ? 'is-selected' : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                <span>{option.label}</span>
                {isSelected && <i className="fa-solid fa-check"></i>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
