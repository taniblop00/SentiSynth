<div align="center">
  <h1>✨ SentiSynth CLI ✨</h1>
  <p><strong>The High-Performance, Schema-Driven Synthetic Data Generator for Developers and AI Engineers.</strong></p>

  <p>
    <a href="https://nodejs.org/" target="_blank">
      <img src="https://img.shields.io/badge/Node.js-18+-green.svg" alt="Node.js version" />
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-5.x-blue.svg" alt="TypeScript" />
    </a>
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License" />
  </p>
</div>

<br />

## 🚨 The Problem

Modern software development and AI training require **massive amounts of data**. 
- Writing SQL scripts manually to seed your database is **slow and error-prone**.
- Testing pagination, real-world edge cases, and load limits requires **realistic production-like data** that is hard to generate.
- Training your own Large Language Models (LLMs) requires **thousands of high-quality Q&A pairs** which takes days to scrape or write.
- Complex relational databases with Foreign Keys (`user_id`, `order_id`) are a nightmare to mock properly without breaking constraints.

## 💡 The Solution: SentiSynth

**SentiSynth** is a lightning-fast CLI tool built to solve exactly this. Whether you need an e-commerce database with relational constraints or an Instruct-Tuning dataset for your next LLM, SentiSynth generates **millions of realistic rows in seconds**, directly into JSON, CSV, JSONL, or raw SQL inserts.

### Why you'll love it:
- ⚡ **Lightning Fast:** Generates millions of rows using highly-optimized Node streams without crashing your memory.
- 🎯 **Relational Intelligence:** Understands Topographical Dependency Graphs (`ref(users.id)`), ensuring parent tables are generated before child tables seamlessly.
- 🤖 **LLM Native:** Built-in infinite, high-quality Q&A dataset generators for fine-tuning your own models across 20+ topics (Science, History, Coding, General Trivia, etc).
- 🛠️ **Two Modes of Power:** Use the **Interactive Wizard** for a guided UI experience, or build robust `config.yaml` schemas for CI/CD automation.
- 💅 **Beautiful Developer Experience:** High-refresh CLI progress bars, elegant error handling, and robust Zod validation.

---

## 🚀 Quick Start (No Installation Required!)

You don't even need to install it. If you have Node installed, just run the Interactive Wizard directly:

```bash
npx tsx src/cli.ts create
```

The CLI will greet you with an elegant, guided setup:
1. Choose between **Templates** (E-commerce, Social Media, LLM Q&A) or **Custom Mode**.
2. Select the columns you want.
3. Choose the export format (JSON, JSONL, CSV, SQL).
4. Watch the progress bars fly!

---

## 📖 Using Configuration Files (CI/CD / Advanced)

For automated or complex data generation, define your schema in a simple `config.yaml`:

```yaml
users:
  rows: 1000
  fields:
    id: uuid
    first_name: faker.person.firstName
    last_name: faker.person.lastName
    email: internet.email
    is_active: boolean
    created_at: date

orders:
  rows: 5000
  fields:
    order_id: uuid
    user_id: ref(users.id) # 🔗 Tells SentiSynth to grab an ID from the generated users!
    amount: finance.amount
    status: word.sample
```

### Generate the Data:
```bash
npx tsx src/cli.ts generate -c config.yaml -f sql -o ./output
```

**Formats supported:** `-f json`, `-f jsonl`, `-f csv`, `-f sql`

---

## 🧠 Generating AI Fine-Tuning Datasets

Need to fine-tune LLaMA, Mistral, or exactly your own model? SentiSynth acts as an **Infinite Dataset Factory**. 

Create an LLM config (`llm-config.yaml`):

```yaml
training_data:
  rows: 100000  # Generate 100k rows instantly
  fields:
    id: uuid
    system_prompt: llm_system_prompt
    user_question: llm_question
    ai_answer: llm_answer
```

When you generate this, SentiSynth will utilize a dynamic template engine pumping out highly diverse, context-aware instruct-tuning data ranging from advanced `Software Engineering`, `Cyber Security` and `Aerospace`, to `Everyday Geography` and `Cooking`. Output to `.jsonl` directly for HuggingFace compatibility.

---

## 💻 Tech Stack Highlights
- **Commander.js & Inquirer.js** - For a robust, beautiful interactive terminal.
- **Faker.js** - The industry standard engine behind the realism.
- **Zod** - Bulletproof schema validation and typing.
- **TypeScript** - Built entirely with strict type safety for predictability.

<br />

<div align="center">
  <b>Built to make developers smile. Happy Synthesizing! 🚀</b>
</div>
