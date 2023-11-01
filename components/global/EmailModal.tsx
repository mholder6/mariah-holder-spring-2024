'use client'

import { useState, useRef, useEffect, FormEventHandler, Fragment } from 'react'
import { Dialog, Listbox, Popover, Transition } from '@headlessui/react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Editor } from '@tinymce/tinymce-react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'

import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import RemoveDoneOutlinedIcon from '@mui/icons-material/RemoveDoneOutlined';
import AttachmentDropzone from '../AttachmentDropzone';

type props = {
  recipients: student[]
  modalShown: boolean,
  closeModal: () => void,
}


const EmailModal = ({recipients, modalShown, closeModal} : props) => {
  const [emailContent, setEmailContent] = useState({
    subject: '',
    body: '',
  })
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);


  const editorRef = useRef<any>(null);

  const log = () => {
    if (editorRef.current) {
        setEmailContent({...emailContent, body: editorRef.current.getContent()});
      }
  };


  const handleFormSubmit = (e: Event) => {
    e.preventDefault();
    sendEmail({...emailContent, recipients: selectedRecipients})

  }
  
  // deselect or select all recipients 
  const toggleAllRecipients: () => void = () => {
    if (selectedRecipients.length === 0) {
      const recs: string[] = []
      recipients.map((recipient) => recs.push(recipient.email))
      setSelectedRecipients(recs);
    } else {
      setSelectedRecipients([]);
    }
  }

  useEffect(() => {
    const recs: string[] = []
    recipients.map((recipient) => recs.push(recipient.email))
    setSelectedRecipients(recs);
  }, [recipients])


  return (
    <Dialog
      open={modalShown}
      onClose={() => closeModal()}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 w-screen overflow-y-auto">
        {/* Container to center the panel */}
        <div className="flex h-full items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <Dialog.Panel className="flex flex-col w-[90%] xl:w-[70%] 2xl:w-[60%] h-[80%] transition-all duration-200 mx-auto rounded-lg bg-white">
              <Dialog.Title className='text-lg bg-shaw-garnet rounded-t-lg px-8 py-4 text-white'>
                <span className='flex items-center justify-center w-fit gap-2'>
                  Compose
                  <EditOutlinedIcon className='w-5' />
                </span>
              </Dialog.Title>
              <div className='w-full h-full p-8 overflow-y-scroll text-black'>
                <form 
                  className='w-full min-h-[100%] flex flex-col gap-4 pb-10'
                  // onSubmit={handleFormSubmit}
                  >
                  <div className='relative flex flex-col w-fit'>
                    <p>Recipients</p>
                    <div className='flex flex-row items-center justify-center gap-4'>
                      <Listbox value={selectedRecipients} onChange={setSelectedRecipients} multiple>
                        <div className="relative w-[15rem]">
                          <Listbox.Button className={`relative w-full cursor-default rounded-lg ${selectedRecipients.length ? 'bg-shaw-garnet/80 text-white' : 'bg-white'} cursor-pointer py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-shaw-garnet/50 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-shaw-garnet/30 sm:text-sm`}>
                            <span className="block truncate">{selectedRecipients.length ? `${selectedRecipients.length}/${recipients.length} selected`: 'No selection'}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className={`h-5 w-5 ${selectedRecipients.length ? 'text-white': 'text-gray-400'}`}
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {recipients.map((recipient, recipientIdx) => (
                                <Listbox.Option
                                  key={recipientIdx}
                                  className={({ active }) =>
                                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                      active ? 'bg-shaw-garnet text-white' : 'text-gray-900'
                                    }`
                                  }
                                  value={recipient.email}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected ? 'font-medium' : 'font-normal'
                                        }`}
                                      >
                                        {recipient.email}
                                      </span>
                                      {selected ? (
                                        <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-shaw-garnet'}`}>
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                      <div className='flex items-center justify-center flex-row gap-2'>
                        {
                          selectedRecipients.length !== 0 ?
                          <button 
                          onClick={toggleAllRecipients}
                          className='' type='button'>
                            <RemoveDoneOutlinedIcon className='p-1 w-6 hover:text-shaw-garnet' />
                          </button>                          
                          :
                          <button 
                          onClick={toggleAllRecipients}
                          className='' type='button'>
                            <DoneAllOutlinedIcon className='p-1 w-6 hover:text-shaw-garnet' />
                          </button>   
                        }
                      </div>
                    </div>
                  </div>
                  <div className='w-full relative'>
                    <label 
                      htmlFor="email-subject"
                      className=''  
                    >Subject</label>
                    <input
                      id='email-subject' 
                      type="text"
                      className='w-full border-2 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus-visible:border-shaw-garnet/50 focus-visible:ring-offset-2 focus-visible:ring-offset-shaw-garnet/30'
                    />

                  </div>
                  <div className='w-full flex h-full flex-col mb-4'>
                    <p></p>
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                      onInit={(evt, editor) => editorRef.current = editor}
                      initialValue={emailContent.body}
                      init={{
                        menubar: true,
                        plugins: [
                          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                          'bold italic forecolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; jnk-size:14px }',
                      }}
                    />
                  </div>
                  <div>
                    <p>Attachments</p>
                    <AttachmentDropzone />
                  </div>
                  <button 
                    role='submit'
                    className='w-fit bg-shaw-garnet px-2 py-2 text-white rounded'
                  >
                    Send
                  </button>
                </form>
              </div>
            </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}

export default EmailModal;