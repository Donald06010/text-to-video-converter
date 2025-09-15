// Mock API for testing Text-to-Video Converter
const mockJobs = new Map();

const generateId = () => Math.random().toString(36).substr(2, 9);

const mockVideoUrl = 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4';

export const mockApi = {
  convert: async (text) => {
    const id = generateId();
    mockJobs.set(id, { 
      status: 'processing', 
      text, 
      startTime: Date.now() 
    });
    
    // Simulate processing time (3-5 seconds)
    const processingTime = 3000 + Math.random() * 2000;
    
    setTimeout(() => {
      const job = mockJobs.get(id);
      if (job) {
        // 90% success rate for testing
        if (Math.random() > 0.1) {
          job.status = 'completed';
          job.videoUrl = mockVideoUrl;
        } else {
          job.status = 'error';
          job.message = 'Processing failed due to server error';
        }
      }
    }, processingTime);
    
    return { id };
  },

  getStatus: async (id) => {
    const job = mockJobs.get(id);
    if (!job) {
      return { status: 'error', message: 'Job expired or not found' };
    }
    return job;
  }
};