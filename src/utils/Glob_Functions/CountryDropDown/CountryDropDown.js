import './CountryDropDown.scss';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const CountryDropDown = ({
  emailRef,
  setMobileNo,
  mobileNo,
  mobileNoRef,
  IsMobileThrough,
  handleKeyDown,
  handleInputChange,
  Errors,
  setErrors,
  Countrycodestate,
  setCountrycodestate,
  isElvee = false,
  activeStep

}) => {
  const [CountryDefault, setCountryDefault] = useState();
  const [Countrycode, setCountrycode] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {

    const FetchCodeList = async () => {
      try {
        const response = JSON.parse(sessionStorage.getItem('CountryCodeListApi')) ?? [];
        const phonecode = response?.filter((val) => val?.IsDefault == 1);
        const mob = sessionStorage.getItem('Countrycodestate') || Countrycodestate;
        if (mob) {
          setCountrycodestate(mob);
        } else {
          setCountrycodestate(phonecode[0]?.mobileprefix);
        }
        setCountrycode(response);
        setCountryDefault(phonecode[0]?.PhoneLength)
      } catch (error) {
        console.log(error)
      }
    }
    // CountryCodeListApi(finalID)
    //   .then((res) => {
    //     const phonecode = res?.Data?.rd?.filter((val) => val?.IsDefault == 1);
    //     const mob = sessionStorage.getItem('Countrycodestate') ;
    //     if(mob){
    //       setCountrycodestate(mob);
    //       return ;
    //     }else{
    //       setCountrycodestate(phonecode[0]?.mobileprefix);
    //     }
    //     setCountrycode(res?.Data?.rd);
    //     setCountryDefault(phonecode[0]?.PhoneLength)
    //   })
    //   .catch((err) => console.log(err));
    FetchCodeList()
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);


  const handleCountryChange = (event, value) => {
    if (value) {
      setCountrycodestate(value?.mobileprefix);
      setCountryDefault(value?.PhoneLength);
      setOpen(false);
      setMobileNo('')
      setErrors({
        ...Errors,
        mobileNo: ``,
      });
    }
  };

  const handleMobileInputChange = (e) => {
    const value = e.target.value;

    if (value.length > CountryDefault) {
      e.preventDefault();
      return;
    }

    const numericValue = value.replace(/[^0-9]/g, '');
    e.target.value = numericValue;

    if (numericValue.length === CountryDefault) {
      setErrors({
        ...Errors,
        mobileNo: '',
      });
    } else if (numericValue?.length > 0 && numericValue?.length < CountryDefault) {
      setErrors({
        ...Errors,
        mobileNo: `Mobile number must be ${CountryDefault} digits.`,
      });
    } else {
      setErrors({
        ...Errors,
        mobileNo: '',
      });
    }
    handleInputChange(e, setMobileNo, 'mobileNo');
  };

  return (
    <div className="mobile-smr"
    style={isElvee ? {
     width:'unset !important',

    } : {}}
      ref={dropdownRef}>
      <div className="MOBILE_CODE"
        onClick={() => !IsMobileThrough && setOpen(true)}
        style={isElvee ? {
          marginTop: "0px !important",
          margin: 'unset !important'
        } : {}}
      >
        <input
          type="text"
          placeholder="91"
          value={Countrycodestate}
          onFocus={() => !IsMobileThrough && setOpen(true)}
          readOnly={IsMobileThrough}
          style={{
            cursor: 'pointer',
            pointerEvents: 'none',
          }}
        />
      </div>
      {!IsMobileThrough && open && (
        <div className="county_Dropdown_list">
          <Autocomplete
            disablePortal
            options={Countrycode}
            getOptionLabel={(option) => `${option?.mobileprefix} - ${option?.countryname}`}
            sx={{ width: '100%' }}
            open={open}
            freeSolo
            inputRef={mobileNoRef}
            onChange={handleCountryChange}
            renderInput={(params) => <TextField {...params} placeholder="Search Your Country" />}
          />
        </div>
      )}
      <TextField
        name="user-mobileNo"
        id="outlined-basic mobileNo"
        label="Mobile No."
        variant="outlined"
        autoComplete="new-mobileNo"
        className="labgrowRegister"
        style={isElvee ? {
          margin: 'unset !important',
          marginTop: 'unset !important',
          marginBlock: 'unset !important',
          marginInline: 'unset !important'
        } : { margin: '15px' }}
        sx={isElvee ? {
          margin: 'unset !important',
          marginTop: 'unset !important',
          marginBlock: 'unset !important',
          marginInline: 'unset !important',
        } : {}}
        type="text"
        inputMode="numeric"
        inputProps={{
          maxLength: CountryDefault,
          pattern: '[0-9]*',
        }}
        InputProps={{
          readOnly: IsMobileThrough, // controls if input is editable
        }}
        value={mobileNo}
        inputRef={mobileNoRef}
        onKeyDown={(e) => handleKeyDown(e, emailRef)}
        onChange={handleMobileInputChange}
        error={!!Errors.mobileNo}
        helperText={isElvee ? null : Errors.mobileNo}
      />
    </div>
  );
};

export default CountryDropDown;
