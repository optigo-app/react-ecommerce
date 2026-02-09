import React from "react";
import PaymentComponent from "../../../../../../utils/PaymentComponent/PaymentComponent";
import { IsSetupFor } from "../../../Recoil/atom";

const Payment = () => {
  return (
    <div>
      <PaymentComponent bgcolor={"#000"} elvee={ IsSetupFor? false :  true} />
    </div>
  );
};

export default Payment;
