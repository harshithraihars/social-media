import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import ProfilePhoto from "./shared/ProfilePhoto"
import { Textarea } from "./ui/textarea"
import { Images } from "lucide-react"
import { useRef, useState } from "react"
import { readFileAsDataUrl } from "@/lib/utils"
import Image from "next/image"
import { createPostAction } from "@/lib/serveractions"
import { toast } from "sonner"

export function PostDialog({ setOpen, open, src }: { setOpen: any, open: boolean, src: string }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<string>("");
    const [inputText, setInputText] = useState<string>("");

    const changeHandler = (e: any) => {
        setInputText(e.target.value);
    }

    const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const dataUrl = await readFileAsDataUrl(file);
            setSelectedFile(dataUrl);
        }
    }
    const postActionHandler = async (formData: FormData) => {
        const inputText = formData.get('inputText') as string;
        try {
            await createPostAction(inputText, selectedFile);
        } catch (error) {
            console.log('error occurred', error);
        }
        setInputText("");
        setOpen(false);
    }

    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)} className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex gap-2">
                        <ProfilePhoto src={src} />
                        <div>
                            <h1>Patel Mern Stack</h1>
                            <p className="text-xs">Post to anyone</p>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <form action={(formData) => {
                    const promise = postActionHandler(formData);
                    toast.promise(promise, {
                        loading:'Creating post...',
                        success:'Post created',
                        error:'Failed to create post'
                    })
                }}>
                    <div className="flex flex-col">
                        <Textarea
                            id="name"
                            name="inputText"
                            value={inputText}
                            onChange={changeHandler}
                            className="border-none text-lg focus-visible:ring-0"
                            placeholder="Type your message here."
                        />
                        <div className="my-4">
                            {
                                selectedFile && (
                                    <Image
                                        src={selectedFile}
                                        alt="preview-image"
                                        width={400}
                                        height={400}
                                    />
                                )
                            }
                        </div>
                    </div>
                    <DialogFooter>
                        <div className="flex items-center gap-4">
                            <input ref={inputRef} onChange={fileChangeHandler} type="file" name="image" className="hidden" accept="image/*" />
                            <Button type="submit">Post</Button>
                        </div>
                    </DialogFooter>
                </form>
                <Button className="gap-2" onClick={() => inputRef?.current?.click()} variant={'ghost'}>
                    <Images className="text-blue-500" />
                    <p>Media</p>
                </Button>
            </DialogContent>
        </Dialog>
    )
}
// its an client component oly since it is rendered from an client componen
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import { Images } from "lucide-react";
// import { useRef, useState } from "react";
// import Image from "next/image";
// import { toast } from "sonner";
// import { readFileAsDataUrl } from "@/lib/utils";
// import { createPostAction } from "@/lib/serveractions";
// import ProfilePhoto from "./shared/ProfilePhoto";

// export function PostDialog({
//   open,
//   setOpen,
//   src,
// }: {
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   src: string;
// }) {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [selectedFile, setSelectedFile] = useState<string>("");
//   const [inputText,setInputText]=useState<string>("")
//   const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];

//     if (file) {
//       const Dataurl = await readFileAsDataUrl(file);
//       setSelectedFile(Dataurl);
//     }
//   };

//   // cant create server action in client file
//   const postActionHandler=async (formData:FormData)=>{
//     const inputText=formData.get("inputText") as string
//     try{
//       await createPostAction(inputText,selectedFile)
//     }catch(error){
//       console.log("some thing went wrong",error)
//     }    
//     setInputText("")
//     setOpen(false)
//   }
//   return (
//     <Dialog open={open}>
//       <DialogContent
//         onInteractOutside={() => setOpen(false)}
//         className="sm:max-w-[425px]"
//       >
//         <DialogHeader>
//           <DialogTitle className="flex gap-2">
//             <ProfilePhoto src={src} />
//             <div>
//               <h1>Harshith Rai</h1>
//               <p className="text-xs font-thin">Post to anyone</p>
//             </div>
//           </DialogTitle>
//         </DialogHeader>
//         <form action={(formData)=>{
//           const promise=postActionHandler(formData)
//           toast.promise(promise,{
//             loading:"Creating Post...",
//             success:"Post Created Successfully",
//             error:"Failed to Create Post"
//           })
//         }}>
//           <div className="flex flex-col">
//             <Textarea
//             onChange={((e)=>setInputText(e.target.value))}
//             value={inputText}
//               id="name"
//               placeholder="Type Your message here"
//               name="inputText"
//               className="border-none text-lg focus-visible:ring-0"
//             />
//             <div className="my-4">
//               {selectedFile && (
//                 <Image
//                   src={selectedFile}
//                   alt="image"
//                   width={400}
//                   height={400}
//                 />
//               )}
//             </div>
//           </div>
//           <DialogFooter>
//             <div className="flex items-center gap-4">
//               <input
//                 ref={inputRef}
//                 type="file"
//                 name="image"
//                 className="hidden"
//                 accept="image/*"
//                 onChange={fileChangeHandler}
//               />
//               <Button type="submit">Post</Button>
//             </div>
//           </DialogFooter>
//         </form>
//         <Button
//           className="gap-2"
//           variant={"ghost"}
//           onClick={() => inputRef?.current?.click()}
//         >
//           <Images className="text-blue-500" />
//           <p>Media</p>
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// }