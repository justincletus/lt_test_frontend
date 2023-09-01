import { Box, Step, StepLabel, Stepper, Button } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react"
import { useSelector } from "react-redux";
import * as yup from "yup";
import { shades } from "../../theme";


const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const cart = useSelector((state) => state.cart.cart);
    const isFirstStep = activeStep === 0;
    const isSecondStep = activeStep === 1;

    const handleFormSubmit = async (values, actions) => {
        setActiveStep(activeStep + 1);

        if (isFirstStep && values.shippingAddress.isSameAddress) {
            actions.setFieldValue("shippingAddress", {
                ...values.billingAddress,
                isSameAddress: true,
            })
        }

        if (isSecondStep) {
            makePayment(values);
        }
        actions.setTouched({})
    };

    async function makePayment(values) {
        console.log(values)
    }


    return (
        <Box>
            <Stepper>
                <Step>
                    <StepLabel>Billing</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Payment</StepLabel>
                </Step>
            </Stepper>
            <Box>
                <Formik></Formik>
            </Box>
        </Box>
    )
}

const initialValues = {
    billingAddress: {
        firstName: "",
        lastName: "",
        country: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        pinCode: "",
    },
    shippingAddress: {
        isSameAddress: true,
        firstName: "",
        lastName: "",
        country: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        pinCode: "",
    },
    email: "",
    phoneNumber: "",
}

const checkoutSchema = [

]


export default Checkout;