"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signUpSchema } from "@/Schemas/signUpSchema";
import { useRouter } from "next/navigation";
import axios from "axios";
export function SignupForm() {
  const router = useRouter()
  const [flage, setFlage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState("")
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    bio: "",
    mobileNumber : "",
    otpCode: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendOtp = async () => {
    setError("")
    const validation = signUpSchema.safeParse(formData)
    if(!validation.success){
      setError(validation.error.errors[0].message)
      console.log(validation)
      return
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/send-otp",
        { formData},
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.statusCode !== 200) {
        console.log(response);
        console.log("Otp not sent");
        setError(response.data.message)
        setLoading(false);
        return
      }
      setFlage(true);
      setLoading(false);
      console.log(response)
    } catch {
      setLoading(false);
      console.error("Otp not sent");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFlage(false);
    if (
      !formData.otpCode
    ) {
      window.alert("Enter OTP code");
      return;
    }
    setLoading(true)
    try {
      const response = await axios.post("/api/varify-otp",{formData},{
        headers : {
          "Content-Type" : "multipart/form-data"
        }
      });
      if(response.data.statusCode !== 200){ 
        setError(response.data.message)
        setLoading(false)
        return
      }
      console.log(response);
      setLoading(false)
      window.alert("Otp Varifyed successfully");
      router.replace("/api/completeProfile")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!flage ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
          <Card className="w-full max-w-3xl shadow-md rounded-lg bg-white">
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold">
                Sign Up
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Username</Label>
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Full Name</Label>
                  <Input
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Bio</Label>
                  <Input
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Mobile Number</Label>
                  <Input
                    type="number"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </form>
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
              {/* Centered Sign-Up Button */}
              <div className="flex justify-center mt-4">
                <Button
                  onClick={sendOtp}
                  type="submit"
                  className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Sign Up
                </Button>
              </div>

              <div className="flex items-center my-3">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-500">or</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              {/* Social Signup Buttons */}
              <div className="flex justify-center gap-4">
                <Button className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2">
                  <FaGoogle /> Sign Up with Google
                </Button>
                <Button className="bg-gray-800 hover:bg-gray-900 text-white flex items-center gap-2">
                  <FaGithub /> Sign Up with GitHub
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
          <Card className="w-full max-w-3xl shadow-md rounded-lg bg-white">
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold">
                Verfiy OTP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Username</Label>
                  <Input
                    disabled
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Full Name</Label>
                  <Input
                  disabled
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                  disabled
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input
                  disabled
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Bio</Label>
                  <Input
                  disabled
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Mobile Number</Label>
                  <Input
                  disabled
                    type="number"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </form>
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
              {/* Centered Sign-Up Button */}

              <div className="flex items-center my-3">
                <Label>Enter OTP</Label>
                <Input
                type="password"
                name="otpCode"
                onChange={handleChange}
                value={formData.otpCode}
                ></Input>
              </div>
              <div className="flex justify-center gap-4">
                <Button onClick={handleSubmit} className="bg-gray-800 hover:bg-gray-900 text-white flex items-center gap-2">
                  Verify-OTP
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

export default SignupForm;
