import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { data, useLoaderData } from 'react-router';

const Rider = () => {
     const {
          register,
          handleSubmit,
          control,
          // formState:{errors}
        } = useForm();
        const { user } = useAuth();
        const axiosSecure = useAxiosSecure();

        const serviceCenters = useLoaderData();
        const regionsDuplicate = serviceCenters.map((c) => c.region);
        const regions = [...new Set(regionsDuplicate)];

        // explore rseMemo useCallback
         const districtsByRegion = (region) => {
           const regionDistricts = serviceCenters.filter(
             (c) => c.region === region,
           );
           const districts = regionDistricts.map((d) => d.district);
           return districts;
         };


        const riderRegion = useWatch({ control, name: "region" });
        


        const handleRiderApplication = data => {
            console.log(data);
        }
    return (
      <div>
        <h2 className="text-4xl text-primary">Be a Rider</h2>

        <form
          onSubmit={handleSubmit(handleRiderApplication)}
          className="mt-12 p-4 text-black"
        >
          {/* two collum  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Rider Details */}

            <fieldset className="fieldset">
              <h4 className="text-2xl font-semibold">Rider Details</h4>
              {/*Rider name */}
              <label className="label ">Rider name</label>
              <input
                type="text"
                {...register("name")}
                defaultValue={user?.displayName}
                className="input w-full"
                placeholder="Sender name"
              />
              {/* Rider Email*/}
              <label className="label "> Email</label>
              <input
                type="text"
                {...register("email")}
                defaultValue={user?.email}
                className="input w-full"
                placeholder="Sender Email"
              />
              {/* Rider region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend"> Region</legend>
                <select
                  {...register("region")}
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

              {/* Rider District */}

              <fieldset className="fieldset">
                <legend className="fieldset-legend"> District</legend>
                <select
                  {...register("district")}
                  defaultValue="Pick a  district"
                  className="select"
                >
                  <option disabled={true}>Pick a District</option>

                  {districtsByRegion(riderRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Rider Address */}
              <label className="label mt-4">Your Address</label>
              <input
                type="text"
                {...register("address")}
                className="input w-full"
                placeholder="Sender Address"
              />
              {/* Rider PhonNo */}
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
              <h4 className="text-2xl font-semibold">More Details</h4>
              {/* receiver name */}
              <label className="label ">Driving License</label>
              <input
                type="text"
                {...register("license")}
                className="input w-full"
                placeholder="Driving License"
              />
              {/* Receiver Email*/}
              <label className="label ">NID</label>
              <input
                type="text"
                {...register("nid")}
                className="input w-full"
                placeholder="NID"
              />
              {/* Bike */}
              <label className="label mt-4">BIKE</label>
              <input
                type="text"
                {...register("bike")}
                className="input w-full"
                placeholder="BIKE"
              />
              {/* address */}

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
            className="btn btn-primary mt-8 text-black"
            value="Apply as a Rider"
          />
        </form>
      </div>
    );
};

export default Rider;