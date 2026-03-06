# shopify-phorest-integration
Custom Shopify integration that syncs ecommerce orders with Phorest to automatically award loyalty points.

## Description

This service acts as middleware between **Shopify** and **Phorest**. It listens for Shopify order webhooks and updates the corresponding client's loyalty points in Phorest through the Phorest API.

This allows businesses using Shopify for ecommerce and Phorest for CRM/loyalty to keep loyalty points synchronized automatically.

## Features

- Shopify webhook listener
- Secure webhook handling
- Loyalty point calculation
- Phorest API integration
- TypeScript-based backend
- GitHub Actions CI

## Tech Stack

- Node.js
- TypeScript
- Express
- Shopify Webhooks
- Phorest API
- GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Shopify store with webhook access
- Phorest API credentials

### Installation

Clone the repository:

```bash
git clone https://github.com/jordanantonio/shopify-phorest-integration.git
cd shopify-phorest-integration