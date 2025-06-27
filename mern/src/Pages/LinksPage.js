import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateLinkForm from '../components/CreateLinkForm';
import { serverEndpoint } from '../config';

const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = async () => {
    try {
      const res = await axios.get(`${serverEndpoint}/links`, { withCredentials: true });
      setLinks(res.data.data || []);
    } catch (err) {
      console.error('Error fetching links:', err);
      alert('Failed to load links');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Campaign Links</h2>

      <CreateLinkForm onSuccess={fetchLinks} />

      {loading ? (
        <p>Loading links...</p>
      ) : links.length === 0 ? (
        <p>No links created yet.</p>
      ) : (
        <div className="row">
          {links.map(link => (
            <div key={link._id} className="col-md-6 mb-4">
              <div className="card">
                {link.thumbnail && (
                  <img src={link.thumbnail} className="card-img-top" alt="thumbnail" style={{ height: 180, objectFit: 'cover' }} />
                )}
                <div className="card-body">
                  <h5 className="card-title">{link.campaignTitle}</h5>
                  <p className="card-text">
                    <strong>Category:</strong> {link.category}<br />
                    <strong>Clicks:</strong> {link.clickcount}
                  </p>
                  <a href={`${serverEndpoint}/links/r/${link._id}`} target="_blank" rel="noreferrer" className="btn btn-primary">
                    Go to Link
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinksPage;
