import React, { Fragment, useState } from "react";
import {
	Button,
	Card,
	Col,
	Container,
	Form,
	InputGroup,
	Row,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ For redirect

const monthList = [
	{ label: "January", value: 1 },
	{ label: "February", value: 2 },
	{ label: "March", value: 3 },
	{ label: "April", value: 4 },
	{ label: "May", value: 5 },
	{ label: "June", value: 6 },
	{ label: "July", value: 7 },
	{ label: "August", value: 8 },
	{ label: "September", value: 9 },
	{ label: "October", value: 10 },
	{ label: "November", value: 11 },
	{ label: "December", value: 12 },
];

const dayList = Array.from({ length: 31 }, (_, i) => i + 1);
const currentYear = new Date().getFullYear();
const yearList = Array.from({ length: 100 }, (_, i) => currentYear - i);

const SignUpForm = ({ updateUserDetails }) => {
	const navigate = useNavigate();
	const [validated, setValidated] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		birthDay: "",
		birthMonth: "",
		birthYear: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = event.currentTarget;

		if (form.checkValidity() === false) {
			event.stopPropagation();
			setValidated(true);
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		const birthDate = `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`;

		try {
			const response = await axios.post(
				"http://localhost:5001/auth/signup",
				{
					firstName: formData.firstName,
					lastName: formData.lastName,
					email: formData.email,
					password: formData.password,
					birthDate,
				},
				{ withCredentials: true } // ✅ send cookies
			);

			updateUserDetails(response.data.user); // ✅ update app state
			navigate("/dashboard"); // ✅ redirect
		} catch (err) {
			console.error(err);
			alert("Signup failed");
		}

		setValidated(true);
	};

	return (
		<Form noValidate validated={validated} onSubmit={handleSubmit}>
			<Row>
				<Col lg={6}>
					<Form.Group className="mb-4">
						<Form.Label>First Name</Form.Label>
						<Form.Control
							type="text"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							required
							placeholder="Your First Name"
						/>
					</Form.Group>
				</Col>
				<Col lg={6}>
					<Form.Group className="mb-4">
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							type="text"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							required
							placeholder="Your Last Name"
						/>
					</Form.Group>
				</Col>
				<Col xs={12}>
					<Form.Group className="mb-4">
						<Form.Label>Birth Date</Form.Label>
						<InputGroup>
							<Form.Select name="birthDay" value={formData.birthDay} onChange={handleChange} required>
								<option value="">Day</option>
								{dayList.map((day) => (
									<option key={day} value={day}>{day}</option>
								))}
							</Form.Select>
							<Form.Select name="birthMonth" value={formData.birthMonth} onChange={handleChange} required>
								<option value="">Month</option>
								{monthList.map(({ label, value }) => (
									<option key={value} value={value}>{label}</option>
								))}
							</Form.Select>
							<Form.Select name="birthYear" value={formData.birthYear} onChange={handleChange} required>
								<option value="">Year</option>
								{yearList.map((year) => (
									<option key={year} value={year}>{year}</option>
								))}
							</Form.Select>
						</InputGroup>
					</Form.Group>
				</Col>
				<Col xs={12}>
					<Form.Group className="mb-4">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							placeholder="Your Email"
						/>
					</Form.Group>
				</Col>
				<Col lg={6}>
					<Form.Group className="mb-4">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
							placeholder="Enter Password"
						/>
					</Form.Group>
				</Col>
				<Col lg={6}>
					<Form.Group className="mb-4">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							required
							placeholder="Confirm Password"
						/>
					</Form.Group>
				</Col>
			</Row>

			<Form.Group className="mb-4">
				<Form.Check
					required
					label={
						<Fragment>
							I accept the{" "}
							<a href="/terms" target="_blank" rel="noopener noreferrer">
								terms &amp; condition
							</a>{" "}
							and{" "}
							<a href="/privacy" target="_blank" rel="noopener noreferrer">
								privacy policy
							</a>
						</Fragment>
					}
				/>
			</Form.Group>

			<Button variant="primary" type="submit" className="w-100">
				Sign Up
			</Button>
		</Form>
	);
};

const SignUp = ({ updateUserDetails }) => {
	return (
		<Container className="py-5">
			<Row className="justify-content-center">
				<Col md={8}>
					<Card>
						<Card.Body>
							<h2 className="mb-4 text-center">Create Your Account</h2>
							<SignUpForm updateUserDetails={updateUserDetails} />
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default SignUp;
