"use client";

import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import { ThemeContext } from "@/app/lib/ThemeContext";
import { communityValidationSchema } from "@/app/components/validations/communityValidationSchema";
import { SnackbarProvider, useSnackbar } from "notistack";
import axios from "axios";
import { Discussion } from "@/app/types/discussion";
import { Contributor } from "@/app/types/contributor";
import ContributorModal from "@/app/components/community/ContributorModal";
import LoadingSkeleton from "@/app/components/community/LoadingSkeleton";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const CommunityPage: React.FC = () => {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MyApp />
    </SnackbarProvider>
  );
};

function MyApp() {
  const { theme } = useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();
  const [submitting, setSubmitting] = useState(false);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [expandedDiscussion, setExpandedDiscussion] = useState<number | null>(
    null
  );
  const [openContributorDialog, setOpenContributorDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [discussionsResponse, contributorsResponse] = await Promise.all([
          axios.get("/api/conversation/discussions"),
          axios.get("/api/conversation/contributors"),
        ]);

        // console.log("Discussions Response:", discussionsResponse.data);
        // console.log("Contributors Response:", contributorsResponse.data);

        setDiscussions(discussionsResponse.data);
        setContributors(contributorsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleReadMore = (index: number) => {
    setExpandedDiscussion(expandedDiscussion === index ? null : index);
  };

  const handleOpenContributorDialog = () => {
    setOpenContributorDialog(true);
  };

  const handleCloseContributorDialog = () => {
    setOpenContributorDialog(false);
  };

  const discussionFormik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: communityValidationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        const response = await axios.post(
          "/api/conversation/discussions",
          values
        );
        console.log("Discussion Post Response:", response.data);

        enqueueSnackbar(
          response.data.message || "Discussion posted successfully!",
          {
            variant: "success",
          }
        );

        discussionFormik.resetForm();

        // Ensure response.data.newDiscussion matches the expected structure
        if (response.data.newDiscussion) {
          setDiscussions((prevDiscussions) => [
            response.data.newDiscussion,
            ...prevDiscussions,
          ]);
        } else {
          console.error("Unexpected response structure:", response.data);
          enqueueSnackbar("Unexpected response structure. Please try again.", {
            variant: "error",
          });
        }
      } catch (error: any) {
        console.error("Error posting discussion:", error.message);
        enqueueSnackbar("Failed to post discussion. Please try again.", {
          variant: "error",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  // const contributorFormik = useFormik({
  //   initialValues: {
  //     name: "",
  //     description: "",
  //   },
  //   onSubmit: async (values) => {
  //     setSubmitting(true);
  //     try {
  //       const response = await axios.post(
  //         "/api/conversation/contributors",
  //         values
  //       );
  //       console.log("Contributor Post Response:", response.data);

  //       enqueueSnackbar(
  //         response.data.message || "Contributor added successfully!",
  //         {
  //           variant: "success",
  //         }
  //       );

  //       contributorFormik.resetForm();

  //       // Ensure response.data.newContributor matches the expected structure
  //       if (response.data.newContributor) {
  //         setContributors((prevContributors) => [
  //           response.data.newContributor,
  //           ...prevContributors,
  //         ]);
  //         handleCloseContributorDialog();
  //       } else {
  //         console.error("Unexpected response structure:", response.data);
  //         enqueueSnackbar("Unexpected response structure. Please try again.", {
  //           variant: "error",
  //         });
  //       }
  //     } catch (error: any) {
  //       console.error("Error adding contributor:", error.message);
  //       enqueueSnackbar("Failed to add contributor. Please try again.", {
  //         variant: "error",
  //       });
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   },
  // });

  const handleAddContributor = async (values: { name: string; description: string }) => {
    setSubmitting(true);
    try {
      const response = await axios.post("/api/conversation/contributors", values);
      console.log("Contributor Post Response:", response.data);

      if (response.data.newContributor) {
        enqueueSnackbar(response.data.message || "Contributor added successfully!", {
          variant: "success",
        });
        setContributors((prevContributors) => [response.data.newContributor, ...prevContributors]);
        handleCloseContributorDialog();
      } else {
        console.error("Unexpected response structure:", response.data);
        enqueueSnackbar("Unexpected response structure. Please try again.", {
          variant: "error",
        });
      }
    } catch (error: any) {
      console.error("Error adding contributor:", error.message);
      enqueueSnackbar("Failed to add contributor. Please try again.", {
        variant: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div
      className={`min-h-screen py-24 ${
        theme === "dark"
          ? "dark-mode-content text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <Navbar onSearch={(query) => {}} suggestions={[]} />
      <div
        className={`relative w-full lg:w-4/5 mx-auto rounded-sm border-2 py-8 px-4 md:px-8 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-300"
        }`}
      >
        <h3
          className={`border-b text-2xl pb-8 font-bold ${
            theme === "dark"
              ? "border-gray-700 text-white"
              : "border-gray-300 text-gray-700"
          }`}
        >
          Community
        </h3>
        <div className="mt-4 space-y-8 w-full">
          <section className="community-section w-full">
            <h4 className="text-xl font-semibold">Latest Discussions</h4>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {discussions && discussions.length > 0 ? (
                discussions.map((discussion, index) => (
                  <div
                    key={index}
                    className={`discussion-item bg-${
                      theme === "dark" ? "gray-700" : "white"
                    } border rounded-md p-4 transition-transform transform hover:scale-105`}
                  >
                    <h5 className="text-lg font-medium">{discussion.title}</h5>
                    <p className="text-sm">
                      {expandedDiscussion === index
                        ? discussion.content
                        : `${discussion.content.slice(0, 100)}...`}
                    </p>
                    <div className="text-right">
                      <button
                        className={` hover:underline ${ theme === "dark" ? "text-orange-500" : "text-blue-500"}`}
                        onClick={() => handleReadMore(index)}
                      >
                        {expandedDiscussion === index
                          ? "Show Less"
                          : "Read More"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                  <LoadingSkeleton type="discussion" />
              )}
            </div>
          </section>

          <section className="community-section w-full">
            <h4 className="text-xl font-semibold">Top Contributors</h4>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contributors && contributors.length > 0 ? (
                contributors.map((contributor, index) => (
                  <div
                    key={index}
                    className={`contributor-item bg-${
                      theme === "dark" ? "gray-700" : "white"
                    } border rounded-md p-4 transition-transform transform hover:scale-105`}
                  >
                    <h5 className="text-lg font-medium">{contributor.name}</h5>
                    <p className="text-sm">{contributor.description}</p>
                    <div className="text-right">
                      <button
                        className={`hover:underline ${ theme === "dark" ? "text-orange-500" : "text-blue-500"}`}
                        onClick={() =>
                          console.log(
                            "View Profile clicked for:",
                            contributor.name
                          )
                        }
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                  <LoadingSkeleton type="contributor" />
              )}
            </div>
            
          </section>

          <section className="community-section text-right mt-4">
            <button
              onClick={handleOpenContributorDialog}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Add Contributor
            </button>
            <ContributorModal
              open={openContributorDialog}
              onClose={handleCloseContributorDialog}
              onSubmit={handleAddContributor}
              submitting={submitting}
            />
          </section>

          <section className="community-section">
            <h4 className="text-xl font-semibold">Join the Conversation</h4>
            <form
              className="mt-4 space-y-4 lg:mx-auto lg:w-3/4 xl:w-1/2"
              onSubmit={discussionFormik.handleSubmit}
            >
              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="discussion-title"
                  className="w-full font-bold text-sm"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="discussion-title"
                  name="title"
                  onChange={discussionFormik.handleChange}
                  onBlur={discussionFormik.handleBlur}
                  value={discussionFormik.values.title}
                  className={`w-full border border-2 px-3 py-[5px] rounded-md ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  } ${
                    discussionFormik.errors.title &&
                    discussionFormik.touched.title
                      ? "register-input"
                      : ""
                  }`}
                  placeholder={
                    discussionFormik.touched.title &&
                    discussionFormik.errors.title
                      ? discussionFormik.errors.title
                      : "Enter the discussion title"
                  }
                />
              </div>
              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="discussion-content"
                  className="w-full font-bold text-sm"
                >
                  Content
                </label>
                <textarea
                  id="discussion-content"
                  name="content"
                  onChange={discussionFormik.handleChange}
                  onBlur={discussionFormik.handleBlur}
                  value={discussionFormik.values.content}
                  className={`w-full border border-2 px-3 py-[5px] rounded-md ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  } ${
                    discussionFormik.errors.content &&
                    discussionFormik.touched.content
                      ? "register-input"
                      : ""
                  }`}
                  rows={5}
                  placeholder={
                    discussionFormik.touched.content &&
                    discussionFormik.errors.content
                      ? discussionFormik.errors.content
                      : "Enter the discussion content"
                  }
                ></textarea>
              </div>
              <button
                type="submit"
                className={`px-4 py-2 rounded-md ${
                  theme === "dark"
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                }`}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Post Discussion"}
              </button>
            </form>
          </section>
        </div>
      </div>
      <Footer />
     
    </div>
  );
}

export default CommunityPage;
