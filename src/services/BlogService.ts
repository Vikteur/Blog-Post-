import { BlogPost } from '../types';
import { IBlogService } from './interfaces';

const posts: BlogPost[] = [{
  id: '1',
  title: 'Survival of the Fittest: Embracing AI to Stay Relevant',
  content: `I remember the exact moment I started to feel it. A colleague dropped a link in Slack: "just tried this AI thing, built a REST API in ten minutes." I opened it, read through the code, and felt a knot form in my stomach. Not because the code was good. But because I wasn't sure if anyone would notice that it wasn't.

Ever since AI became a serious tool, more and more developers have been quietly asking themselves the same uncomfortable question: am I still needed? And honestly, you can understand why. The progress AI has made over the past few years is staggering. What would take me a full day to scaffold, it can produce in minutes. Coding has never been this fast.

> Why would a company even hire a developer anymore? It could also just write a prompt for what they want...

I've heard that more times than I can count. Maybe you've thought it yourself.

**The short answer is: no, it's not that simple. And this article is about why.**

---

## A fool with a tool is still a fool

Picture this. There's a tall oak next to your house. It's blocking the sun, the roots are lifting your patio, and every storm has you nervous. You've decided: it has to go.

You drive to the hardware store and rent a chainsaw. You've seen people use them on YouTube. How hard can it be?

You come home, fire it up, and go at the trunk from the wrong side. It cracks, shifts, and the tree crashes straight through your roof.

The chainsaw did exactly what it was supposed to do. It cut fast. But in the hands of someone who didn't understand what they were doing, it turned a manageable problem into a catastrophe.

That image is what I think about every time I see someone treat AI like a magic button.

A quick, vague prompt might produce something that looks like working code. It might even run. But what language did it pick? What version? What framework? Is there any structure at all, or is it one file with three hundred lines of spaghetti that nobody will be able to maintain in six months? If you don't know the answers to those questions before the AI starts generating, you are not in control. You are just hoping for the best, holding a very loud chainsaw.

**AI needs context to work properly. The more you give it, the better the result.**

---

## Example: the naive approach

To make this concrete, let me walk through something I tried myself. A simple clothing webshop backend, nothing fancy, just two features: retrieve all orders and create a new one. I knew I wanted Java and Spring Boot, so I opened up an AI assistant and typed this:

\`\`\`
Create me a simple application about a clothing webshop. It should be written in java using spring boot.
The app should be able to retrieve all existing orders and create a new order.
An order has an id, name and description.
\`\`\`

And it worked. Kind of.

It generated a pom:

![alt text](/images/blog/survival-of-the-fittest/image-1.png)

At first glance it looks fine. But look closer. Java 17, not wrong, but if you're starting a new project today you'd want something newer. And an H2 in-memory database. Fine for a demo, but not something you'd build a real webshop on top of.

![alt text](/images/blog/survival-of-the-fittest/image-2.png)

The structure told the same story. An entity, a controller, a repository. All dumped into one package with no separation of concerns. The moment you start adding real features, this turns into a maintenance nightmare.

The AI did exactly what it was told. The problem was that it wasn't told nearly enough. It had no idea about preferred architecture, target Java version, database strategy, or testing approach. So it guessed. And its guesses were fine for a  prototype, but not for anything you'd actually want to ship.

This is the core issue. **You cannot produce a well-structured application without first knowing and communicating. What well-structured means to you.**

---

## The right tools for the job

So how do you fix this? You could dump all your requirements into one enormous prompt. But that gets messy fast, it's hard to maintain, and you'd end up rewriting it every time you start something new.

There is a better way, a colleague explained it to me using a kitchen analogy that stuck immediately:

- **MCP servers** are like the oven or blender. They are tools that the chef can use to do the work faster.
- **Instruction files** are the house rules on the kitchen wall. Always wash your hands, never use this knife for that. They apply to everything the chef does. In AI terms: global preferences like always use strict TypeScript or write conventional commits.
- **An agent.md** is a station-specific briefing. The pastry chef and the grill chef both follow the house rules, but each has their own extra instructions. It tells the AI what role it is playing and what extra rules apply for that context.
- **The project.md** is the menu. Without it the chef just cooks whatever they feel like. With a good project.md the AI knows the architecture, the stack, and the patterns to follow. It is probably the most important file you can give it.
- **Skills** are the cooking techniques. A chef does not reinvent how to make a sauce every single time. They have a practiced, repeatable method. Skills work the same way: reusable step-by-step instructions for recurring tasks like adding a new endpoint or updating the OpenAPI contract.

And one more thing: use the **plan mode** of your agent. Plan mode tells the AI to think before it acts. It maps out what it is going to do and shows you the steps before writing a single line of code. Like a chef reading through the full recipe before touching anything. It catches misunderstandings before they become bugs.

---

## Example: the right approach

Armed with all of that, I went back to the same clothing webshop. Same requirements. Same two features. But this time, I did the work upfront.

### Setting up the project.md

Before writing a single line of code or a single prompt. I sat down and thought about what I actually wanted. Java 25, Spring Boot 4, Onion architecture, contract-first, Lombok to keep things clean, and Testcontainers for proper testing. I wrote all of that into a project.md file.

You could also add the order entity here as a concrete example. On a larger project I probably wouldn't, but for something this size it helps anchor the AI immediately.

The result looked like this:

![alt text](/images/blog/survival-of-the-fittest/image-3.png)

### Defining the skills

With the project.md in place, I moved on to the skills. Because the Onion architecture has distinct layers, I wrote one skill for each layer.

**Domain skill**

The domain is the heart of the application. No Spring in here, just pure Java. I added validation rules and told it to implement the notification pattern. That last part is personal preference, but the point is: the skill is opinionated, and that's exactly what you want.

![alt text](/images/blog/survival-of-the-fittest/image-4.png)

**Adapter skill**

The adapter layer is where the outside world meets the domain. This is where Spring finally enters the picture. I told it to use annotations, wire up controllers and repository implementations, always map through DTOs, stick to the OpenAPI spec since the project is contract-first, and never let any domain logic leak into this layer.

![alt text](/images/blog/survival-of-the-fittest/image-6.png)

**Usecase skill**

The usecase layer sits between domain and adapter. No Spring here, just plain Java, one \`execute()\` method per usecase, one responsibility. Repository interfaces live here too, keeping the domain clean while the adapter provides the actual implementations.

![alt text](/images/blog/survival-of-the-fittest/image-7.png)

One more thing about skills worth mentioning: you can attach references. These are example files the skill can draw from to produce better output. I created one for every skill. The usecase skill's reference is shown above. You can find the rest in my GitHub repo.

And because I was building this solo, I also added a **code reviewer skill** to catch things I might miss before pushing.

### Running the prompt with plan mode

With everything in place, I wrote out the actual prompt. Detailed this time, in a separate md file:

![alt text](/images/blog/survival-of-the-fittest/image-8.png)

Then I entered plan mode before touching anything:

![alt text](/images/blog/survival-of-the-fittest/image-22.png)

Now I could kick off the implementation:

![alt text](/images/blog/survival-of-the-fittest/image-11.png)

It immediately picked up the project.md and the skills:

![alt text](/images/blog/survival-of-the-fittest/image-12.png)

Then it came back with a full plan before writing a single line of code:

![alt text](/images/blog/survival-of-the-fittest/image-13.png)
![alt text](/images/blog/survival-of-the-fittest/image-14.png)

That's the part I love most about plan mode. You can read through every step, catch anything that seems off, and course-correct before the AI has done anything irreversible. In this case, it looked exactly right. So I let it run.

![alt text](/images/blog/survival-of-the-fittest/image-15.png)

Seven minutes later:

![alt text](/images/blog/survival-of-the-fittest/image-16.png)

### Code review before pushing

The application was done. But before pushing, I ran the code reviewer skill. It immediately flagged a few things that weren't quite right:

![alt text](/images/blog/survival-of-the-fittest/image-17.png)

![alt text](/images/blog/survival-of-the-fittest/image-18.png)

Fair catches. Fixed them:

![alt text](/images/blog/survival-of-the-fittest/image-19.png)

Then it noticed something I would have forgotten entirely. The target folder with generated sources was about to get committed:

![alt text](/images/blog/survival-of-the-fittest/image-20.png)

That's exactly the kind of thing that slips through when you're moving fast. The code reviewer caught it before it became anyone else's problem.

Final sign-off:

![alt text](/images/blog/survival-of-the-fittest/image-21.png)

Curious to see the result? Visit https://github.com/Vikteur/OrderCenter/.

---

## What have we learned?

Three hours of writing markdown files. That's what it cost. Not three hours of coding, three hours of thinking carefully about architecture, patterns, and how to communicate that clearly to an AI. And in return, I got a clean, readable, maintainable project that I'm actually proud of.

Compare that to the first attempt. The one that handed me Java 17, H2, and a flat package structure. The difference isn't subtle. It's the difference between something you'd show a senior engineer and something you'd quietly delete.

Developers who invest in learning how to work with AI properly will stay relevant. Those who either ignore it entirely or blindly throw prompts at it without structure will fall behind. This is survival of the fittest in practice. Adapt, or become irrelevant.

## Key takeaways

- **A fool with a tool is still a fool.** AI does not replace the need to understand what you are building.
- **Context is everything.** The more you tell the AI about your architecture, stack, and patterns, the better the output.
- **A project.md is your single source of truth.** Without it, the AI is just guessing.
- **Skills make AI consistent.** Instead of explaining the same patterns over and over, encode them once and reuse them.
- **Plan mode before code.** Always let the AI map out its approach before it starts writing. It catches mistakes before they happen.
- **Use a code reviewer skill.** Even AI-generated code benefits from a second pass.

The goal is not to write less code, it is to write better code, faster. Developers who embrace AI the right way will not be replaced by it. They will outpace everyone who does not.`,
  summary: 'AI won\'t replace developers. Developers who learn to use AI properly will outpace those who don\'t. This article explores why context, structure, and the right tooling make all the difference.',
  date: '2026-03-03T00:00:00.000Z',
  topic: 'AI',
  author: 'Viktor Van Steenweghen',
  authorId: '1',
  image: '/images/blog/survival-of-the-fittest/dev_vs_ai.webp'
}];
// Implementation of the BlogService
export class BlogService implements IBlogService {
  private posts: BlogPost[] = [...posts];
  async getPosts(): Promise<BlogPost[]> {
    // In a real app, this would fetch from an API
    return Promise.resolve([...this.posts]);
  }
  async getPost(id: string): Promise<BlogPost | null> {
    const post = this.posts.find(p => p.id === id);
    return Promise.resolve(post || null);
  }
}
// Singleton instance for the application
export const blogService = new BlogService();