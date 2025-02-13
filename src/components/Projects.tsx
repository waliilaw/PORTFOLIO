// credits to sanatan dive 

import React from 'react';
import { motion } from "framer-motion";
import { FaGithub } from 'react-icons/fa';


const Projects = () => {
  return (
    <section id='projects'>
    <div className='pb-4' >
      <motion.h2 
        className='my-20 text-center text-4xl'>

      </motion.h2>

      {/* Project 2 */}
      <div className='mb-8 flex flex-wrap lg:justify-center'>
        <motion.div 
      
          className='w-full lg:w-1/4'>
            <a href='https://Valentino.waliilaw.me'>
            <img src='/valentino.jpg' width={500} height={500} alt="LiveDox" className='mb-6 lg:mx-[-100px] rounded-xl'/>
            </a>
         
        </motion.div>
        <motion.div
          className='w-full max-w-xl lg:w-3/4'>
          <a href='https://Valentino.waliilaw.me'>
          <h3 className='mb-2 font-semibold text-2xl'>Valentino</h3>
          </a>
          <p className='mb-4 text-stone-400'>
You enter your username and the Twitter API fetch your profile and pass it on to Gemini API which has prompt to comment on the user's Posts , PFP , username  
          </p>
          <a className='text-2xl  '  href='https://github.com/waliilaw/Valentino' target='_blank'>
            <FaGithub />
          </a>
          <div className='mt-4 flex flex-wrap'>
          <span className='mr-3 rounded bg-pink-700 p-2 text-sm font-medium text-stone-300'>React</span>
          <span className='mr-3 rounded bg-pink-700 p-2 text-sm font-medium text-stone-300'>Tailwind</span>
          <span className='mr-3 rounded bg-pink-700 p-2 text-sm font-medium text-stone-300'>TypeScript</span>
          <span className='mr-3 rounded bg-pink-700 p-2 text-sm font-medium text-stone-300'>Twitter API</span>
          </div>
        </motion.div>
      </div>
      <div className='mb-8 flex flex-wrap lg:justify-center'>
        <motion.div 
          className='w-full lg:w-1/4'>
            <a href='https://github.com/waliilaw/Kagura'>
            <img src='/kagura.jpg' width={500} height={500} className='mb-6 lg:mx-[-100px] rounded-xl'/>
            </a>
         
        </motion.div>
        <motion.div
          className='w-full max-w-xl lg:w-3/4'>
          <a href='https://github.com/waliilaw/Kagura'>
          <h3 className='mb-2 font-semibold text-2xl'>Kagura</h3>
          </a>
          <p className='mb-4 text-stone-400'>
         A Real-time Chat React App with Cloudinary Image Upload and Authentication and Socket.io for real-time chat , and More AI feature soon to be added
         </p>
          <a className='text-2xl  '  href='https://github.com/waliilaw/Kagura' target='_blank'>
            <FaGithub />
          </a>
          <div className='mt-4 flex flex-wrap'>
          <span className='mr-3 rounded bg-orange-700 p-2 text-sm font-medium text-stone-300'>React</span>          
          <span className='mr-3 rounded bg-orange-700 p-2 text-sm font-medium text-stone-300'>Socket.io</span>
          <span className='mr-3 rounded bg-orange-700 p-2 text-sm font-medium text-stone-300'>Typescript</span>

          </div>
        </motion.div>
      </div>

      {/* Project 1 */}
      <div className='mb-8 flex flex-wrap lg:justify-center'>
        <motion.div 
         
          className='w-full lg:w-1/4'>
            <a href='https://github.com/waliilaw/Power-Rangers-FRONTEND--PUBLIC?tab=readme-ov-file'>
          <img src='/rangers.jpg' width={500} height={500} alt="9otes" className='mb-6 lg:mx-[-100px] rounded-xl'/>
          </a>
        </motion.div>
        <motion.div
      
          className='w-full max-w-xl lg:w-3/4'>
          <a href='https://github.com/waliilaw/Power-Rangers-FRONTEND--PUBLIC?tab=readme-ov-file'>
          <h3 className='mb-2 font-semibold text-2xl'>Red Ranger</h3>
          </a>
          <p className='mb-4 text-stone-400'>
          Use Twitter’s API to allow users to fetch their profile details (e.g., username, profile picture) by entering their X username. This information can be used to assign a Ranger to the user. </p>
          <a className='text-2xl  '  href='https://github.com/waliilaw/Power-Rangers-FRONTEND--PUBLIC?tab=readme-ov-file' target='_blank'>
            <FaGithub />
          </a>

          <div className='mt-4 flex flex-wrap'>
          <span className='mr-3 rounded bg-red-700 p-2 text-sm font-medium text-stone-300'>React</span>
          <span className='mr-3 rounded bg-red-700 p-2 text-sm font-medium text-stone-300'>Kinde</span>
          <span className='mr-3 rounded bg-red-700 p-2 text-sm font-medium text-stone-300'>TypeScript</span>
          <span className='mr-3 rounded bg-red-700 p-2 text-sm font-medium text-stone-300'>ShadCN</span>
          </div>
        </motion.div>
      </div>


      {/* project 3 */}
      
   
    </div>
    </section>  
  );
}

export default Projects;