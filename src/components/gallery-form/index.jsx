import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import config from "../../config.json";
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import uuid from "react-uuid";
import AWS from "aws-sdk";
import axios from "axios";
//const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ContactForm = () => {
  const [post, setPost] = useState([]);
  const [authorise, setAuthorise] = useState(false);
  const [progress, setProgress] = useState("");
  const [message, setMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [currentDate, setCurrentDate] = useState(getDate());
  const [file, setFile] = useState(null);
  const [secret, setSecret] = useState([]);
  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();
  const onSubmit = async (data, e) => {
    var datas = {
      id: uuid(),
      title: data.name,
      category: data.category,
      thumbnail: "",
      imageurl: "",
      createddate: currentDate,
      createdby: "ssndigitalmedia",
      viewingallery: 1,
      width: 1,
      isactive: 1,
      website: config.domain,
    };

    //console.log(datas);
    try {
      getsecrets();
      //console.log("sec", secret);
      uploadFile(datas, "home", secret, e);
    } catch (err) {
      //console.log(err);
      // alert("There is an error", err);
    }
  };

  const getsecrets = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      //mode: "no-cors",
      body: JSON.stringify({ title: "React Hooks POST Request Example" }),
    };
    const secrets = fetch(config.aws_service_url + "getsecrets", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setSecret(data);
        return data;
      })
      .catch((err) => {
        //console.log("response", err);
      });
  };

  const uploadFile = async (datas, type, secret, e) => {
    // S3 Bucket Name
    //console.log("seccccc", secret);
    const S3_BUCKET = config.S3_BUCKET_NAME + type;
    //console.log("S3_BUCKET", S3_BUCKET);
    // S3 Region
    const REGION = "ap-south-1";

    // S3 Credentials
    AWS.config.update({
      accessKeyId: secret.s3key,
      secretAccessKey: secret.s3secret,
    });
    ////console.log("S3SECRET", S3SECRET);
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Files Parameters
    if (file === undefined || file === null) {
      setMessage("Please select file");
      return;
    }
    if (file?.size > 400000) {
      setMessage("Please upload file less than 400 kb");
      return;
    }
    const slugify = function (text) {
      return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w-]+/g, "") // Remove all non-word chars
        .replace(/--+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
    };
    const slugifyfilename = function (text) {
      return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/--+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
    };
    const imagename = slugifyfilename(slugify(datas.title) + "-ssndigitalmedia-" + file.name);
    const params = {
      Bucket: S3_BUCKET,
      Key: imagename,
      Body: file,
    };

    ////console.log("s3parms", params);
    // Uploading file to s3

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        //console.log("Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%");
        setProgress("Uploaded " + parseInt((evt.loaded * 100) / evt.total) + "%");
      })
      .promise();

    upload.then(() => {
      const url = config.bucketurl + type + "/" + imagename;
      //console.log(url);
      if (type === "home") {
        const { thumbnail } = {};
        datas.thumbnail = url;
        datas.imageurl = url;
        datas.type = "home";
        //console.log("timeline", datas);
      } else {
        return;
      }

      fetch(config.aws_service_url + "/items", { method: "POST", headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }, mode: "no-cors", body: JSON.stringify(datas) })
        .then((response) => response)
        .then((data) => {
          //console.log("submit", data);
          if (data.status == 200 || data.status == 0) {
            setMessage("Saved Sucessfully");
            alert("Saved Sucessfully");
            e.target.reset();
            // window.location.reload();
          }
        })
        .catch((err) => {
          //console.log("timelinerrror", err);
          //setMessage(err.Message);
        });
    });
  };
  const handleFileChange = (e) => {
    // Uploaded file
    //console.log("file", e.target.files[0]);
    const file = e.target.files[0];
    // Changing file state

    setFile(file);
    setMessage("");
  };
  const password = (e) => {
    if (e === "pappu") setAuthorise(true);
    else setAuthorise(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      //console.log("ssnbloginisdefetch");
      const value = "home";
      const response = await axios.get(config.aws_service_url + "itemsbytype/" + value);
      const sorteddata = response?.data.sort((b, a) => a.date?.localeCompare(b.date));
      setPost(sorteddata);
      //console.log(value, sorteddata);
    };
    try {
      fetchData();
    } catch (ex) {
      //console.log("error", ex);
    }
  }, []);

  return (
    <Fragment>
      <>
        <input className={!authorise ? "form-control" : "d-none"} type="password" onChange={(e) => password(e.target.value)} name="name" placeholder="password" required={true} />
        <form className={authorise ? "contact-form-wrapper" : "d-none"} onSubmit={handleSubmit(onSubmit)}>
          {/* <form className="contact-form-wrapper"> */}
          <div className="row">
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Image Name"
                  required={false}
                  ref={register({
                    required: "Image Name is required",
                  })}
                />
                {errors.name && <p>{errors.name.message}</p>}
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="600">
              <div className="form-group">
                <select
                  className="form-control"
                  name="category"
                  placeholder="Image Category"
                  required={true}
                  ref={register({
                    required: "Category is required",
                  })}
                >
                  <option value=""></option>
                  <option value="NATURE">NATURE</option>
                  <option value="COUPLES">COUPLES</option>
                  <option value="PORTRAITS">PORTRAITS</option>
                  <option value="KIDS">KIDS</option>
                  <option value="CREATTIVE">CREATIVE</option>
                  <option value="DECORATIONS">DECORATIONS</option>
                  <option value="SPORTS">SPORTS</option>
                  <option value="EVENTS">EVENTS</option>
                  <option value="OTHERS">OTHERS</option>
                </select>
                {errors.category && <p>{errors.category.message}</p>}
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="900">
              <div className="form-group">
                <input
                  className="form-control"
                  type="file"
                  name="image"
                  placeholder="Upload Image"
                  required={true}
                  onChange={handleFileChange}
                  ref={register({
                    required: "File is required",
                  })}
                />
                {errors.image && <p>{errors.image.message}</p>}
              </div>
            </div>
            <div className="col-md-12" data-aos="fade-up">
              <div className="form-group mb-0"></div>
            </div>
            <div className="p-1 mt-1">{successMsg}</div>
            <div className="p-1 mt-1">{message}</div>
            <div className="p-1 mt-1">{progress}</div>
            <div className="col-md-12 text-center" data-aos="fade-up" data-aos-delay="300">
              <div className="form-group mb-0">
                <button className="btn-submit" type="submit">
                  Upload Image
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    </Fragment>
  );
};

export default ContactForm;
