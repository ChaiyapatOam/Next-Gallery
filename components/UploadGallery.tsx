import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { createClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "../config";
import { UploadImage, createData } from "../lib/Supabase";

export const UploadGallery = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [folder, setFolder] = useState<string | null>(null);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [preview, setPreview] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFolder(e.target.value);
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    let selectedFiles = e.target.files;
    if (selectedFiles) {
      // console.log(selectedFiles);
      setFileList(selectedFiles);
    }
  };

  let files = fileList ? [...fileList] : [];
  // 👇 files is not an array, but it's iterable, spread to get an array of files
  const handleUploadClick = async () => {
    if (!fileList) return;
    if (!folder) return;

    // loop to Uploading all Files
    files.forEach(async (file, i) => {
      const image = await UploadImage(folder, file);
      // Todo : Adding Input Foldername
      await createData(folder, image.name, image.url);
    });

    closeModal();
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!fileList) {
      setPreview([]);
      return;
    }
    files.forEach(async (file, i) => {
      setPreview((preview) => [...preview, URL.createObjectURL(file)]);
    });
    // console.log(preview);

    // free memory when ever this component is unmounted
    // return () => URL.revokeObjectURL();
  }, [fileList]);
  function closeModal() {
    setFileList(null)
    setPreview([]);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className=" inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-gray-700 bg-opacity-20 px-4 py-2 text-sm font-bold text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Upload Images
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center pb-5 font-medium leading-6 text-black"
                  >
                    Upload Images
                  </Dialog.Title>
                  {/* Input Gallery */}
                  <div className="flex justify-center mb-6">
                    <input
                      type="text"
                      className="text-base text-center rounded-md  border border-solid border-gray-300 focus:border-green-500 focus:outline-none"
                      onChange={handleInputChange}
                      placeholder="Enter Gallery Name"
                    />
                  </div>
                  {fileList && fileList.length != 0 ? (
                    <div className="text-center">
                      {preview.map((file, idx) => {
                        return (
                          <img
                            key={idx}
                            className="m-auto mb-5 block"
                            src={file}
                            alt=""
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          multiple
                        />
                      </label>
                      {/* <div>{file && `${file.name} - ${file.type}`}</div> */}
                    </div>
                  )}

                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleUploadClick}
                    >
                      Upload
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
