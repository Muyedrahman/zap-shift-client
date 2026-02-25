import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendParcel = () => {
    const {
      register,
      handleSubmit,
      control,
      // formState:{errors}
    } = useForm();
    const {user} = useAuth();

    const axiosSecure = useAxiosSecure();

    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];

    // explore rseMemo useCallback
    const senderRegion = useWatch({control, name: 'senderRegion'});
    const receiverRegion = useWatch({control, name: "receiverRegion" });

    const districtsByRegion = region =>{
      const regionDistricts = serviceCenters.filter (c => c.region === region);
      const districts = regionDistricts.map(d => d.district);
      return districts;
    }

    console.log(regions);

    const handleSendParcel = data =>{
    console.log(data);
    const isDocument = data.parcelType === 'document';
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument){
      cost = isSameDistrict ? 60 : 80;
    }
    else{
      if(parcelWeight < 3){
        cost = isSameDistrict ? 110 : 150;
      }
      else{
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3 ;
        const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40 ;
        cost = minCharge + extraCharge ;
      }
    }

    console.log('cost', cost);
    data.cost = cost;

    Swal.fire({
      title: "Agree with the Cost?",
      text: `You well be charged ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I agree!",
    }).then((result) => {
      if (result.isConfirmed) {
        // save the parcel info to database
        axiosSecure.post('/parcels', data)
        .then(res =>{
          console.log('after saving parcel',res.data);
        })

        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });

    }

    return (
      <div>
        <h2 className="text-5xl font-bold">Send A Parcel</h2>
        <form
          onSubmit={handleSubmit(handleSendParcel)}
          className="mt-12 p-4 text-black"
        >
          {/* parcel type */}
          <div>
            <label className="label mr-5">
              <input
                type="radio"
                {...register("parcelType")}
                value="document"
                // className="radio"
                defaultChecked
              />
              Document
            </label>
            <label className="label">
              <input
                type="radio"
                {...register("parcelType")}
                value="non-document"
                // className="radio"
                // defaultChecked
              />
              Non-Document
            </label>
          </div>
          {/* parcel info: name, weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
            <fieldset className="fieldset">
              <label className="label">Parcel name</label>
              <input
                type="text"
                {...register("parcelName")}
                className="input w-full"
                placeholder="Parcel name"
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label">Parcel Weight (kg)</label>
              <input
                type="number"
                {...register("parcelWeight")}
                className="input w-full"
                placeholder="Parcel Weight"
              />
            </fieldset>
          </div>

          {/* two collum  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* sender Details */}

            <fieldset className="fieldset">
              <h4 className="text-2xl font-semibold">Sender Details</h4>
              {/* sender name */}
              <label className="label ">Sender name</label>
              <input
                type="text"
                {...register("senderName")}
                defaultValue={user?.displayName}
                className="input w-full"
                placeholder="Sender name"
              />
              {/* sender Email*/}
              <label className="label ">Sender Email</label>
              <input
                type="text"
                {...register("senderEmail")}
                defaultValue={user?.email}
                className="input w-full"
                placeholder="Sender Email"
              />
              {/* sender region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend"> Sender Region</legend>
                <select
                  {...register("senderRegion")}
                  defaultValue="Pick a region"
                  className="select"
                >
                  <option disabled={true}>Pick a region</option>

                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* sender District */}

              <fieldset className="fieldset">
                <legend className="fieldset-legend"> Sender District</legend>
                <select
                  {...register("senderDistrict")}
                  defaultValue="Pick a  district"
                  className="select"
                >
                  <option disabled={true}>Pick a District</option>

                  {districtsByRegion(senderRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* sender Address */}
              <label className="label mt-4">Sender Address</label>
              <input
                type="text"
                {...register("senderAddress")}
                className="input w-full"
                placeholder="Sender Address"
              />
              {/* sender PhonNo */}
              <label className="label mt-4">Sender PhonNo</label>
              <input
                type="text"
                {...register("senderPhonNo")}
                className="input w-full"
                placeholder="Sender PhonNo"
              />

              {/* Pickup instruction */}
              <label className="label mt-4"> Pickup instruction</label>
              <textarea
                {...register("pickupInstruction")}
                className="textarea w-full"
                placeholder=" Pickup instruction"
              ></textarea>
            </fieldset>

            {/* receiver Details */}
            <fieldset className="fieldset">
              <h4 className="text-2xl font-semibold">Receiver Details</h4>
              {/* receiver name */}
              <label className="label ">Receiver name</label>
              <input
                type="text"
                {...register("receiverName")}
                className="input w-full"
                placeholder="Receiver name"
              />
              {/* Receiver Email*/}
              <label className="label ">Receiver Email</label>
              <input
                type="text"
                {...register("receiverEmail")}
                className="input w-full"
                placeholder="Receiver Email"
              />

              {/* Receiver  region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver Region</legend>
                <select
                  {...register("receiverRegion")}
                  defaultValue="Pick a region"
                  className="select"
                >
                  <option disabled={true}>Pick a region</option>

                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Receiver  District */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver District</legend>
                <select
                  {...register("receiverDistrict")}
                  defaultValue="Pick a district"
                  className="select"
                >
                  <option disabled={true}>Pick a District</option>

                  {
                   districtsByRegion(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option> )
                  }
                </select>
              </fieldset>

              {/* receiver Address */}
              <label className="label mt-4">Receiver Address</label>
              <input
                type="text"
                {...register("receiverAddress")}
                className="input w-full"
                placeholder="Receiver Address"
              />
              {/* receiver PhonNo */}
              <label className="label mt-4">Receiver PhonNo</label>
              <input
                type="text"
                {...register("receiverPhonNo")}
                className="input w-full"
                placeholder="Receiver PhonNo"
              />
              {/* receiver District */}
              {/* <label className="label mt-4">Receiver District</label>
              <input
                type="text"
                {...register("receiverDistrict")}
                className="input w-full"
                placeholder="Receiver District"
              /> */}
              {/* Pickup instruction */}
              <label className="label mt-4"> Pickup instruction</label>
              <textarea
                {...register("receiverpickupInstruction")}
                className="textarea w-full"
                placeholder=" Delivery"
              ></textarea>
            </fieldset>
          </div>
          <input
            type="submit"
            className="btn btn-primary text-black"
            value="Send Parcel"
          />
        </form>
      </div>
    );
};

export default SendParcel;
