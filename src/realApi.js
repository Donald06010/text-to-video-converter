// Real API for Text-to-Video Converter
const API_BASE_URL = 'http://127.0.0.1:8001';

export const realApi = {
  convert: async (text) => {
    const response = await fetch(`${API_BASE_URL}/create-talking-photo-video?text=${text}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to create video');
    }

    const data = await response.json();

    if (!data.success || !data.heygen_response?.data?.video_id) {
      throw new Error('Invalid response from server');
    }

    return { id: data.heygen_response.data.video_id };
  },

  getStatus: async (videoId) => {
    const response = await fetch(`${API_BASE_URL}/video-status/${videoId}`);

    if (!response.ok) {
      throw new Error('Failed to get video status');
    }

    const data = await response.json();

    return {
      status: data.status,
      videoUrl: data.video_url,
      error: data.error
    };
  }
};