import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Dashboard({ userDetails }) {
  const name = userDetails?.name || "User";
  const email = userDetails?.email || "Not Available";

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Welcome back, {name}!</h2>

      {/* Profile Card */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="mb-2">Your Profile</h5>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
        </Card.Body>
      </Card>

      {/* Info Cards */}
      <Row>
        <Col md={4} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Quick Access</Card.Title>
              <Card.Text>
                Navigate quickly to your dashboard features or settings.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Tips & Tricks</Card.Title>
              <Card.Text>
                Discover new features and how to make the most of your account.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Recent Activity</Card.Title>
              <Card.Text>
                View your latest login and interactions. Stay updated!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
