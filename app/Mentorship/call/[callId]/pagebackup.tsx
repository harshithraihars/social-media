
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { PhoneOff, Mic, MicOff, Video, VideoOff, Camera } from "lucide-react";
// import { getCurrentUser } from "@/lib/serverAction/userAction";
// import axios from "axios";
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDoc,
//   getDocs,
//   onSnapshot,
//   setDoc,
//   updateDoc,
// } from "firebase/firestore";
// import { firestore } from "@/lib/firebase";
// import { useRouter } from "next/navigation";
// import RatingPage from "./Rating";
// import { useUser } from "@clerk/nextjs";

// interface PageProps {
//   params: { callId: string };
// }

// const servers = {
//   iceServers: [
//     {
//       urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
//     },
//   ],
//   iceCandidatePoolSize: 10,
// };

// const VideoCallPage = ({ params }: PageProps) => {
//   const {user}=useUser()
//   const { callId } = params;
//   const [isCallActive, setIsCallActive] = useState(true);
//   const [isMuted, setIsMuted] = useState(false);
//   const [callDuration, setCallDuration] = useState(0);
//   const [showControls, setShowControls] = useState(true);
//   const [roomId, setRoomId] = useState(callId);
//   const [webcamActive, setWebcamActive] = useState(false);
//   const [remoteStreamActive, setRemoteStreamActive] = useState(false);

//   const router = useRouter();
//   const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const localRef = useRef<HTMLVideoElement | null>(null);
//   const remoteRef = useRef<HTMLVideoElement | null>(null);

//   // Move RTCPeerConnection to ref to avoid global state issues
//   const pcRef = useRef<RTCPeerConnection | null>(null);
//   const localStreamRef = useRef<MediaStream | null>(null);
//   const remoteStreamRef = useRef<MediaStream | null>(null);
//   const [formData, setFormData] = useState({
//     Role: "",
//     mentorId: "",
//     menteeId: "",
//   });
//   const [callEnded, setCallEnded] = useState(false);
  
//   // Initialize RTCPeerConnection
//   const initializePeerConnection = () => {
//     if (pcRef.current) {
//       pcRef.current.close();
//     }

//     pcRef.current = new RTCPeerConnection(servers);
//     return pcRef.current;
//   };

//   useEffect(() => {
//     let interval = null;
//     if (isCallActive) {
//       interval = setInterval(() => {
//         setCallDuration((duration) => duration + 1);
//       }, 1000);
//     } else if (!isCallActive && callDuration !== 0) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isCallActive, callDuration]);

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const handleMouseMove = () => {
//     setShowControls(true);
//     if (controlsTimeoutRef.current) {
//       clearTimeout(controlsTimeoutRef.current);
//     }
//     controlsTimeoutRef.current = setTimeout(() => {
//       setShowControls(false);
//     }, 3000);
//   };

//   useEffect(() => {
//     if (isCallActive) {
//       document.body.style.overflow = "hidden";
//       return () => {
//         document.body.style.overflow = "unset";
//       };
//     }
//   }, [isCallActive]);

//   const handleEndCall = async () => {
//     console.log(formData.Role);

//     // setIsCallActive(false);
//     if (formData.Role === "mentee") {
//       setCallEnded(true);
//     } else {
//       router.push("/Mentor");
//     }
//     await hangUp();

//     hangUp();
//   };

//   const setupSources = async (role: string) => {
//     try {
//       console.log("Setting up sources for role:", role);

//       // Initialize peer connection
//       const pc = initializePeerConnection();

//       // Get user media
//       const localStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });

//       console.log("Local stream tracks:", localStream.getTracks());
//       localStreamRef.current = localStream;

//       // Create remote stream
//       const remoteStream = new MediaStream();
//       remoteStreamRef.current = remoteStream;

//       // Add local tracks to peer connection
//       localStream.getTracks().forEach((track) => {
//         console.log("Adding track to PC:", track.kind, track.id);
//         pc.addTrack(track, localStream);
//       });

//       // Handle incoming tracks
//       pc.ontrack = (event) => {
//         console.log("Received remote track:", event.track.kind, event.track.id);
//         console.log("Remote streams:", event.streams);

//         // Add tracks to remote stream
//         event.streams[0].getTracks().forEach((track) => {
//           console.log("Adding remote track:", track.kind, track.id);
//           remoteStreamRef.current?.addTrack(track);
//         });

//         // Update remote video element
//         if (remoteRef.current && remoteStreamRef.current) {
//           remoteRef.current.srcObject = remoteStreamRef.current;
//           setRemoteStreamActive(true);
//           console.log("Remote stream assigned to video element");
//         }
//       };

//       // Set local video
//       if (localRef.current) {
//         localRef.current.srcObject = localStream;
//         console.log("Local stream assigned to video element");
//       }

//       // Set remote video (initially empty)
//       if (remoteRef.current) {
//         remoteRef.current.srcObject = remoteStream;
//       }

//       setWebcamActive(true);

//       // Connection state monitoring
//       pc.onconnectionstatechange = () => {
//         console.log("Connection state:", pc.connectionState);
//         if (
//           pc.connectionState === "disconnected" ||
//           pc.connectionState === "failed"
//         ) {
//           hangUp(true); // Only reload when connection actually fails
//         }
//       };

//       // ICE connection state monitoring
//       pc.oniceconnectionstatechange = () => {
//         console.log("ICE connection state:", pc.iceConnectionState);
//       };

//       if (role === "mentor") {
//         await setupMentorConnection(pc);
//       } else if (role === "mentee") {
//         await setupMenteeConnection(pc);
//       }
//     } catch (error) {
//       console.error("Error setting up sources:", error);
//     }
//   };

//   const setupMentorConnection = async (pc: RTCPeerConnection) => {
//     const callDoc = doc(firestore, "calls", callId);
//     const offerCandidates = collection(
//       firestore,
//       "calls",
//       callId,
//       "offerCandidates"
//     );
//     const answerCandidates = collection(
//       firestore,
//       "calls",
//       callId,
//       "answerCandidates"
//     );

//     setRoomId(callDoc.id);

//     // Handle ICE candidates
//     pc.onicecandidate = async (event) => {
//       if (event.candidate) {
//         console.log("Adding offer candidate:", event.candidate);
//         await addDoc(offerCandidates, event.candidate.toJSON());
//       }
//     };

//     // Create and set offer
//     const offerDescription = await pc.createOffer();
//     await pc.setLocalDescription(offerDescription);

//     const offer = {
//       sdp: offerDescription.sdp,
//       type: offerDescription.type,
//     };

//     await setDoc(callDoc, { offer });
//     console.log("Offer created and saved");

//     // Listen for answer
//     onSnapshot(callDoc, (snapshot) => {
//       const data = snapshot.data();
//       if (!pc.currentRemoteDescription && data?.answer) {
//         console.log("Received answer, setting remote description");
//         const answerDescription = new RTCSessionDescription(data.answer);
//         pc.setRemoteDescription(answerDescription);
//       }
//     });

//     // Listen for answer candidates
//     onSnapshot(answerCandidates, (snapshot) => {
//       snapshot.docChanges().forEach((change) => {
//         if (change.type === "added") {
//           const candidate = new RTCIceCandidate(change.doc.data());
//           console.log("Adding answer candidate:", candidate);
//           pc.addIceCandidate(candidate);
//         }
//       });
//     });
//   };

//   const setupMenteeConnection = async (pc: RTCPeerConnection) => {
//     const callDoc = doc(firestore, "calls", callId);
//     const offerCandidates = collection(
//       firestore,
//       "calls",
//       callId,
//       "offerCandidates"
//     );
//     const answerCandidates = collection(
//       firestore,
//       "calls",
//       callId,
//       "answerCandidates"
//     );
//     // Handle ICE candidates
//     pc.onicecandidate = async (event) => {
//       if (event.candidate) {
//         console.log("Adding answer candidate:", event.candidate);
//         await addDoc(answerCandidates, event.candidate.toJSON());
//       }
//     };

//     // Get offer and create answer
//     const snapshot = await getDoc(callDoc);
//     const callData = snapshot.data();

//     if (!callData?.offer) {
//       console.error("No offer found in call document");
//       return;
//     }

//     const offerDescription = callData.offer;
//     console.log("Received offer, setting remote description");
//     await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

//     const answerDescription = await pc.createAnswer();
//     await pc.setLocalDescription(answerDescription);

//     const answer = {
//       type: answerDescription.type,
//       sdp: answerDescription.sdp,
//     };

//     await updateDoc(callDoc, { answer });
//     console.log("Answer created and saved");

//     // Listen for offer candidates
//     onSnapshot(offerCandidates, (snapshot) => {
//       snapshot.docChanges().forEach((change) => {
//         if (change.type === "added") {
//           const data = change.doc.data();
//           const candidate = new RTCIceCandidate(data);
//           console.log("Adding offer candidate:", candidate);
//           pc.addIceCandidate(candidate);
//         }
//       });
//     });
//   };
  
//   const hangUp = async () => {
//     console.log("Hanging up call");
//     console.log(formData);
//     // Close peer connection
//     if (pcRef.current) {
//       pcRef.current.close();
//       pcRef.current = null;
//     }

//     // Stop local tracks
//     if (localStreamRef.current) {
//       localStreamRef.current.getTracks().forEach((track) => track.stop());
//       localStreamRef.current = null;
//     }

//     // Clean up Firestore documents
//     if (roomId) {
//       try {
//         const roomRef = doc(firestore, "calls", roomId);

//         const answerCandidatesRef = collection(
//           firestore,
//           "calls",
//           roomId,
//           "answerCandidates"
//         );
//         const answerSnap = await getDocs(answerCandidatesRef);
//         const deleteAnswerPromises = answerSnap.docs.map((docSnap) =>
//           deleteDoc(docSnap.ref)
//         );

//         const offerCandidatesRef = collection(
//           firestore,
//           "calls",
//           roomId,
//           "offerCandidates"
//         );
//         const offerSnap = await getDocs(offerCandidatesRef);
//         const deleteOfferPromises = offerSnap.docs.map((docSnap) =>
//           deleteDoc(docSnap.ref)
//         );

//         await Promise.all([...deleteAnswerPromises, ...deleteOfferPromises]);
//         await deleteDoc(roomRef);

//         console.log("Firestore cleanup completed");
//       } catch (error) {
//         console.error("Error during cleanup:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     const initializeCall = async () => {
//       try {

//         // console.log("getting called");
        
//         const res = await axios.get(`/api/booking?callId=${callId}`);
//         console.log(res.data);
        
//         const { data } = await axios.get(
//             `/api/mentor/profile?userId=${user?.id}`
//           );
//           const userId = data.data.profile._id;
                
//         let role: string;
//         if (userId === res.data.data.mentorId) {
//           role = "mentor";
//         } else {
//           role = "mentee";
//         }

//         setFormData({
//           Role: role,
//           mentorId: res.data.data.mentorId,
//           menteeId: res.data.data.menteeId,
//         });
//         await setupSources(role);
//       } catch (error) {
//         console.error("Error initializing call:", error);
//       }
//     };

//     initializeCall();

//     // Cleanup on unmount
//     return () => {
//       if (controlsTimeoutRef.current) {
//         clearTimeout(controlsTimeoutRef.current);
//       }
//       // Don't reload on component unmount - just clean up resources
//       hangUp();
//     };
//   }, [callId]);

//   return (
//     <div
//       className="video-call-page relative w-full h-screen bg-black overflow-hidden pb-[88px] sm:pb-0"
//       onMouseMove={handleMouseMove}
//       style={{
//         cursor: showControls ? "default" : "none",
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         zIndex: 9999,
//       }}
//     >
//       {/* Remote Video - Full Screen Background */}
//       <div className="absolute inset-0 w-full h-full">
//         <video
//           ref={remoteRef}
//           className="w-full h-full object-cover"
//           autoPlay
//           playsInline
//           muted={false}
//         />
//         {!remoteStreamActive && (
//           <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center">
//             <div className="text-center text-gray-700">
//               <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/60 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm border border-gray-200 shadow-lg">
//                 <Camera size={32} className="sm:w-12 sm:h-12 text-gray-600" />
//               </div>
//               <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800">
//                 Remote Participant
//               </h2>
//               <p className="text-gray-600 text-sm sm:text-base">
//                 Waiting for video stream...
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Local Video - Raised on small screens */}
//       <div className="absolute bottom-40 right-4 sm:bottom-6 sm:right-6 w-32 h-24 sm:w-64 sm:h-48 md:w-80 md:h-60 bg-white rounded-lg overflow-hidden border-2 border-gray-200 shadow-xl">
//         <video
//           ref={localRef}
//           className="w-full h-full object-cover"
//           autoPlay
//           playsInline
//           muted
//         />
//         {!webcamActive && (
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//             <div className="text-center text-gray-700">
//               <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/60 rounded-full flex items-center justify-center mb-2 mx-auto border border-gray-200">
//                 <Camera size={16} className="sm:w-6 sm:h-6 text-gray-600" />
//               </div>
//               <p className="text-xs sm:text-sm text-gray-600 font-medium">
//                 You
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Timer Display */}
//       <div
//         className={`absolute top-4 left-4 sm:top-6 sm:left-6 bg-white/80 backdrop-blur-md text-gray-800 px-3 py-2 sm:px-5 sm:py-3 rounded-xl font-mono text-base sm:text-xl border border-gray-200 shadow-lg transition-opacity duration-300 ${
//           showControls ? "opacity-100" : "opacity-0"
//         }`}
//       >
//         {formatTime(callDuration)}
//       </div>

//       {/* Call Controls - Lifted on small screens */}
//       <div
//         className={`absolute bottom-28 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 sm:space-x-6 transition-all duration-300 ${
//           showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//         }`}
//       >
//         <button
//           onClick={() => setIsMuted(!isMuted)}
//           className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg backdrop-blur-md border-2 ${
//             isMuted
//               ? "bg-red-500/90 hover:bg-red-600/90 border-red-400/50"
//               : "bg-white/80 hover:bg-white/90 border-gray-200/50"
//           }`}
//         >
//           {isMuted ? (
//             <MicOff size={20} className="sm:w-7 sm:h-7 text-white" />
//           ) : (
//             <Mic size={20} className="sm:w-7 sm:h-7 text-gray-700" />
//           )}
//         </button>

//         <button
//           onClick={handleEndCall}
//           className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500/90 hover:bg-red-600/90 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-xl backdrop-blur-md border-2 border-red-400/50"
//         >
//           <PhoneOff size={24} className="sm:w-8 sm:h-8 text-white" />
//         </button>

//         <button className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg backdrop-blur-md border-2 bg-white/80 hover:bg-white/90 border-gray-200/50">
//           <Video size={20} className="sm:w-7 sm:h-7 text-gray-700" />
//         </button>
//       </div>

//       {callEnded && <RatingPage formData={formData} />}
//     </div>
//   );
// };

// export default VideoCallPage;
