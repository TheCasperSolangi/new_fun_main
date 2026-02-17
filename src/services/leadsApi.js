const API_BASE_URL = 'https://api.arcdatum.com/api'; // Change to your API base URL

// Create a new lead
export const createLead = async (leadData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create lead');
    }

    return await response.json();
  } catch (error) {
    console.error('Create lead error:', error);
    throw error;
  }
};

// Get all leads
export const getLeads = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch leads');
    }

    return await response.json();
  } catch (error) {
    console.error('Get leads error:', error);
    throw error;
  }
};

// Get single lead by ID
export const getLead = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch lead');
    }

    return await response.json();
  } catch (error) {
    console.error('Get lead error:', error);
    throw error;
  }
};

// Update lead
export const updateLead = async (id, updateData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update lead');
    }

    return await response.json();
  } catch (error) {
    console.error('Update lead error:', error);
    throw error;
  }
};

// Delete lead
export const deleteLead = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete lead');
    }

    return await response.json();
  } catch (error) {
    console.error('Delete lead error:', error);
    throw error;
  }
};