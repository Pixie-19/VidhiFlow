# VidhiFlow

**VidhiFlow** is an MCP-native Generative UI platform designed for the Indian Judiciary. Unlike traditional legal tech with static dashboards, VidhiFlow uses AI to dynamically render interactive components directly within a chat interface, providing a more intuitive and flexible experience for legal professionals.

## 🚀 Features

*   **Generative UI**: AI-driven interface that renders components on-demand based on context.
*   **Model Context Protocol (MCP) Server**: A dedicated MCP server that exposes specialized tools to AI models.
*   **NJDG Integration**: Fetch real-time case details, status, and history from the National Judicial Data Grid.
*   **MoSPI Data Access**: Retrieve socio-economic indicators from the Ministry of Statistics and Programme Implementation for compensation calculation and economic analysis.
*   **Bhashini Translation**: Real-time translation capabilities for multilingual support in Indian languages.
*   **Legal Tools**:
    *   **Summons Generator**: Automated generation of legal summons.
    *   **Case Status**: Visual cards for tracking case progress.
    *   **Case Summary**: AI-generated summaries of complex legal documents.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 14](https://nextjs.org/)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **AI/MCP**: [Model Context Protocol SDK](https://github.com/modelcontextprotocol/modelcontextprotocol), [@tambo-ai/react](https://github.com/tambo-ai)
*   **Validation**: Zod, Valibot

## 📂 Project Structure

*   `src/app`: Next.js app router pages and API routes.
*   `mcp-server/`: Standalone MCP server implementation exposing tools like `njdg_fetch_case` and `mospi_fetch_indicator`.
*   `src/components/tambo`: Specialized UI components for the legal domain (Case Cards, Translators).
*   `src/lib`: Client libraries for external APIs (Bhashini, NJDG, MoSPI).

## 🏁 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Pixie-19/VidhiFlow.git
    cd VidhiFlow
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Copy the example environment file and configure your keys.
    ```bash
    cp .env.example .env.local
    ```

### Running the Application

**1. Start the Next.js Frontend:**

```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

**2. Start the MCP Server:**

```bash
npm run mcp:serve
```
This runs the Model Context Protocol server, allowing AI clients to interact with the provided tools.

## 🤖 MCP Tools

The `vidhiflow-mcp` server exposes the following tools:

*   **`njdg_fetch_case`**: Fetches case details by case number, diary number, or court code.
*   **`mospi_fetch_indicator`**: Retrieves economic indicators (e.g., inflation, per capita income).

## 📄 License

[MIT](LICENSE)

