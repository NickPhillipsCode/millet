import React, { useState } from 'react';
import './NewCampaignPopUp.css';

const NewCampaignPopUp = ({ isOpen, onClose, addNewCampaign }) => {
    const [formData, setFormData] = useState({
        productName: '',
        campaignType: '',
        price: '',
        endDate: '',
        category: '',
        audience: '',
        feeModel: '',
        startingRate: '',
        isNegotiable: false,
        productImage: '',
        productDescription: '',
    });

    const [activeTab, setActiveTab] = useState('summary'); // Track active tab
    const [errorMessage, setErrorMessage] = useState('');  // Store validation errors

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'feeModel') {
            let startingRate = '';
            if (value === 'Commission') {
                startingRate = ''; // Clear the starting rate for commission
            } else if (value === 'Flat Rate') {
                startingRate = 0; // Default to 0 for flat rate
            }

            setFormData((prevData) => ({
                ...prevData,
                feeModel: value,
                startingRate, // Reset the starting rate when fee model changes
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validation checks
        const {
            productName,
            campaignType,
            price,
            endDate,
            category,
            audience,
            feeModel,
            startingRate,
            productImage,
            productDescription,
        } = formData;
    
        if (
            !productName ||
            !campaignType ||
            !price ||
            !endDate ||
            !category ||
            !audience ||
            !feeModel ||
            !startingRate ||
            !productImage ||
            !productDescription // New validation for Product Description
        ) {
            setErrorMessage('Please fill out all fields before submitting, including the product description.');
            return; // Prevent form submission if any field is empty
        }
    
        // Clear error message if all fields are filled
        setErrorMessage('');
    
        const token = localStorage.getItem('token'); // Or however you're storing the JWT token
    
        try {
            const response = await fetch('http://localhost:5000/api/create-campaign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Send token in Authorization header
                },
                body: JSON.stringify({
                    productName: formData.productName,
                    campaignType: formData.campaignType,
                    price: parseFloat(formData.price), // Ensure price is a valid number
                    endDate: formData.endDate,
                    category: formData.category,
                    audience: formData.audience,
                    feeModel: formData.feeModel,
                    startingRate: formData.startingRate.replace(/[^0-9.]/g, ''), // Remove symbols like $ and %
                    isNegotiable: formData.isNegotiable,
                    productImage: formData.productImage, // Assuming this is the URL to the uploaded image
                    productDescription: formData.productDescription, // Include product description in the request
                }),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log('Campaign created with ID:', result.campaignId);
    
                // Add the new campaign to the list
                addNewCampaign({
                    id: result.campaignId,
                    product_name: formData.productName,
                    campaign_type: formData.campaignType,
                    price: `$${formData.price}`,
                    end_date: formData.endDate,
                    category: formData.category,
                    audience: formData.audience,
                    fee_model: formData.feeModel,
                    starting_rate: formData.startingRate,
                    negotiable: formData.isNegotiable,
                    product_image: formData.productImage,
                    product_description: formData.productDescription,
                });
    
                onClose(); // Close the modal after submission
            } else {
                console.error('Failed to create campaign');
            }
        } catch (err) {
            console.error('Error creating campaign:', err);
        }
    };
    
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Assuming you store the image as a URL (local URL for preview)
            const imageURL = URL.createObjectURL(file);
            setFormData((prevData) => ({
                ...prevData,
                productImage: imageURL, // Update formData with the image URL
            }));
        }
    };

    const handleStartingRateChange = (e) => {
        const { value } = e.target;

        // Function to remove leading zeros
        const removeLeadingZeros = (num) => {
            return num.replace(/^0+(?=\d)/, ''); // Remove leading zeros but keep decimal like 0.5
        };

        // For "Flat Rate," allow digits and a single decimal point after the $ symbol
        if (formData.feeModel === 'Flat Rate') {
            let numericValue = value.replace(/[^0-9.]/g, ''); // Allow digits and '.'
            numericValue = removeLeadingZeros(numericValue); // Remove leading zeros

            const formattedValue = numericValue.split('.').length > 2 ? numericValue.slice(0, -1) : numericValue;

            setFormData((prevData) => ({
                ...prevData,
                startingRate: `$${formattedValue}`, // Ensure $ is always at the start
            }));
        }

        // For "Commission," allow digits and decimal points and add % at the end
        if (formData.feeModel === 'Commission') {
            let numericValue = value.replace(/[^0-9.]/g, ''); // Allow digits and '.'
            numericValue = removeLeadingZeros(numericValue); // Remove leading zeros

            const formattedValue = numericValue.split('.').length > 2 ? numericValue.slice(0, -1) : numericValue;

            setFormData((prevData) => ({
                ...prevData,
                startingRate: formattedValue ? `${formattedValue}%` : '', // Add % symbol after the digits
            }));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-modal" onClick={onClose}>X</button>
                <h2>Create Campaign</h2>

                {/* Show validation error if any */}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                {/* Toggle buttons for Summary and Description */}
                <div className="tab-container">
                    <button
                        className={`tab ${activeTab === 'summary' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('summary')}
                    >
                        Summary
                    </button>
                    <button
                        className={`tab ${activeTab === 'description' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('description')}
                    >
                        Description
                    </button>
                </div>

                {activeTab === 'summary' ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="form-group-half">
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    name="productName"
                                    placeholder="Enter product name"
                                    value={formData.productName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group-half">
                                <label>Campaign Type</label>
                                <select
                                    name="campaignType"
                                    value={formData.campaignType}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select campaign type</option>
                                    <option value="Livestream">Livestream</option>
                                    <option value="Short Video">Short Video</option>
                                </select>
                            </div>
                            <div className="form-group-half">
                                <label>Price (USD)</label>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Enter price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group-half">
                                <label>End Date</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    placeholder="Select end date"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group-half">
                                <label>Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select category</option>
                                    <option value="Beauty">Beauty</option>
                                    <option value="Tech">Tech</option>
                                </select>
                            </div>
                            <div className="form-group-half">
                                <label>Audience</label>
                                <select
                                    name="audience"
                                    value={formData.audience}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select audience</option>
                                    <option value="General">General</option>
                                    <option value="Specific">Specific</option>
                                </select>
                            </div>
                            <div className="form-group-half">
                                <label>Fee Model</label>
                                <select
                                    name="feeModel"
                                    value={formData.feeModel}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Fee Model</option>
                                    <option value="Commission">Commission</option>
                                    <option value="Flat Rate">Flat Rate</option>
                                </select>
                            </div>
                            <div className="form-group-half">
                                <label>Starting Rate</label>
                                <div className="starting-rate-container">
                                    <input
                                        type="text"
                                        name="startingRate"
                                        placeholder={formData.feeModel === 'Flat Rate' ? '$0' : 'Enter percentage'}
                                        value={formData.startingRate}
                                        onChange={handleStartingRateChange}
                                        disabled={!formData.feeModel}
                                        style={{
                                            backgroundColor: !formData.feeModel ? '#e0e0e0' : '#fff',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Move upload image below form fields and above the checkbox */}
                        <div className="upload-image-container">
                            <label htmlFor="image-upload" className="upload-image-button">
                                {formData.productImage ? 'Change Image' : 'Upload Image'}
                            </label>
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
                            />
                            {formData.productImage && (
                                <img
                                    src={formData.productImage}
                                    alt="Uploaded"
                                    style={{
                                        marginTop: '10px',
                                        maxWidth: '100%',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                    }}
                                />
                            )}
                        </div>

                        <div className="checkbox-container">
                            <label>My starting rates are negotiable.</label>
                            <input
                                type="checkbox"
                                name="isNegotiable"
                                checked={formData.isNegotiable}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" className="submit-button">Save</button>
                    </form>
                ) : (
                    <div className="description-container">
                        <label>Product Description</label>
                        <textarea
                            name="productDescription"
                            placeholder="Write the product description"
                            value={formData.productDescription}
                            onChange={handleInputChange}
                        />
                        <button type="submit" className="submit-button">Save</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewCampaignPopUp;
