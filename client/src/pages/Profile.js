import styled from "styled-components";
import Navbar from "../components/Navbar";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../misc/axios";
import { useParams } from "react-router-dom";
import app from "../config/firebase";
import {
  getDownloadURL,
  getStorage,
  ref as refFirebase,
  uploadBytes,
} from "firebase/storage";

const schema = Yup.object().shape({
  image: Yup.mixed(),
  fullname: Yup.string().min(2, "*Min 2 char").required("*Fullname required"),
  username: Yup.string().min(4, "*Min 4 char").required("*Username required"),
  email: Yup.string()
    .email("*Input valid email address")
    .required("*Email required"),
});

const Profile = () => {
  const { userid } = useParams();
  const [user, setUser] = useState({});
  const [imageData, setImageData] = useState();
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const hiddenFile = useRef();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { ref, ...rest } = register("image");

  const handleClickSubmit = async (data) => {
    setLoading(true);
    const filename = new Date().getTime() + data.image.name;
    const storage = getStorage(app);
    const storageRef = refFirebase(storage, `user_profile_pict/${filename}`);
    uploadBytes(storageRef, data.image).then((snapshot) => {
      console.log("upload success");
      getDownloadURL(snapshot.ref).then((url) => {
        try {
          axios.put(`/user/${userid}`, {
            currId: userid,
            fullname: data.fullname,
            image: url,
          });
          setLoading(false);
          setError(false);
          setWarning(true);
        } catch (err) {
          console.log(err);
          setLoading(false);
          setError(true);
          setWarning(true);
        }
      });
    });
    // setLoading(true);
    // setUser(data);
    // console.log(data);
    // try {
    //   setError(false);
    // } catch (error) {
    //   console.log(error);
    //   setError(true);
    // } finally {
    //   setWarning(true);
    //   setLoading(false);
    // }
  };

  const handleFileClick = () => {
    hiddenFile.current.click();
  };

  const handleFileChange = (e) => {
    const uploadFile = e.target.files[0];
    setValue("image", uploadFile);
    setImageData(URL.createObjectURL(uploadFile));
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/user/${userid}`);
        setValue("fullname", res.data.fullname);
        setValue("username", res.data.username);
        setValue("email", res.data.email);
        setValue("image", res.data.image);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [setValue, userid]);

  return (
    <>
      <Navbar other={true} profileChanged={handleClickSubmit} />
      <Container>
        <Wrapper>
          <ProfileContainer>
            <Title>PROFILE</Title>
            {warning && (
              <Warning error={error}>
                {error ? "SOMETHING WENT WRONG" : "PROFILE HAS BEEN UPDATED"}
              </Warning>
            )}
            <FormContainer onSubmit={handleSubmit(handleClickSubmit)}>
              <DivImage>
                <Image
                  src={
                    imageData
                      ? imageData
                      : !user.image
                      ? "https://firebasestorage.googleapis.com/v0/b/lastword-849c6.appspot.com/o/user_profile_pict%2F1651779500534blank%20profile.webp?alt=media&token=631f959a-d622-4937-bd07-5a1a43e5392a"
                      : user.image
                  }
                  alt=''
                />
                <Label
                  style={{
                    display: "flex",
                    cursor: "pointer",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                  onClick={handleFileClick}
                >
                  CHANGE PROFILE PICTURE
                </Label>
                <Input
                  type='file'
                  {...rest}
                  name='image'
                  onChange={handleFileChange}
                  ref={(e) => {
                    ref(e);
                    hiddenFile.current = e;
                  }}
                  style={{ display: "none" }}
                />
              </DivImage>

              <Label htmlFor='fullname'>Fullname</Label>
              <Input
                autoComplete='off'
                placeholder='Fullname'
                {...register("fullname")}
              />
              <Par>{errors.fullname?.message}</Par>

              <Label htmlFor='username'>Username</Label>
              <Input
                autoComplete='off'
                placeholder='Username'
                disabled
                {...register("username")}
              />
              <Par>{errors.username?.message}</Par>

              <Label htmlFor='email'>Email</Label>
              <Input
                autoComplete='off'
                placeholder='Email'
                type='email'
                disabled
                {...register("email")}
              />
              <Par>{errors.email?.message}</Par>

              <Button type='submit' disabled={loading}>
                {loading ? "Loading..." : "UPDATE"}
              </Button>
            </FormContainer>
          </ProfileContainer>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 110px;
`;

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Warning = styled.div`
  background-color: ${(props) => (props.error ? "#f16461" : "green")};
  color: white;
  text-align: center;
  font-size: 10px;
  font-weight: 700;
  padding: 8px 0;
`;

const ProfileContainer = styled.div`
  width: 40%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;

  @media only screen and (max-width: 820px) {
    width: 60%;
  }

  @media only screen and (max-width: 390px) {
    width: 70%;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-family: "Oswald";
`;

const FormContainer = styled.form`
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const DivImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  margin-bottom: 10px;
  border-radius: 50%;
  background-color: lightgray;
  object-fit: cover;
`;

const Label = styled.label`
  font-size: 13px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  background-color: #f0f0f0;
  border: none;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  margin: 10px 0;
  font-size: 11px;
  font-weight: 700;
  border: 1px solid white;
  background-color: black;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    border: 1px solid black;
    background-color: white;
    color: black;
  }
  &:disabled {
    color: white;
    background-color: gray;
    cursor: not-allowed;
  }
`;

const Par = styled.p`
  padding-left: 5px;
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
`;

export default Profile;
