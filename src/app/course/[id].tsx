import { Link, useLocalSearchParams } from "expo-router";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Code2, Lightbulb } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";

import { courses, getCourse } from "@/data/courses";

type Lesson = {
  what: string;
  how: string;
  why: string;
  code: string;
  result: string;
};

const lessons: Record<string, Lesson> = {
  foundations: {
    what: "Learn how JavaScript runs, stores information, and executes instructions from top to bottom.",
    how: "A JavaScript program is made from values, variables, expressions, and functions. The computer reads the instructions, evaluates them, and produces a result.",
    why: "Almost every JavaScript application is built from these basic pieces. Once you understand them, larger programs become combinations of smaller ideas.",
    code: 'let name = "Meckiul";\nlet score = 10;\nconsole.log(name);\nconsole.log(score + 5);',
    result: "The program stores two values, then reads them and prints the results.",
  },
  logic: {
    what: "Learn how programs make decisions and repeat work.",
    how: "Conditions evaluate to true or false. if/else chooses a path, while repeats while a condition is true, and for repeats a known number of times.",
    why: "Real software cannot follow one fixed sequence. It needs to react to data, user actions, and changing situations.",
    code: 'let score = 80;\n\nif (score >= 50) {\n  console.log("Pass");\n} else {\n  console.log("Try again");\n}\n\nfor (let i = 1; i <= 3; i++) {\n  console.log(i);\n}',
    result: "The condition chooses the correct message, while the loop performs the same operation three times.",
  },
  html: {
    what: "Learn how a web page is structured with HTML.",
    how: "HTML uses elements to describe the meaning and structure of content. Browsers read those elements and turn them into a document users can see.",
    why: "HTML is the foundation of every website. Headings, paragraphs, buttons, forms, images, and navigation all start with HTML structure.",
    code: '<main>\n  <h1>My Website</h1>\n  <p>Welcome to my page.</p>\n  <button>Get Started</button>\n</main>',
    result: "The browser creates a page with a main section containing a heading, text, and button.",
  },
  css: {
    what: "Learn how CSS controls the appearance and layout of a website.",
    how: "CSS selects elements and applies rules such as color, spacing, size, borders, and layout. Flexbox helps arrange elements in rows and columns.",
    why: "HTML gives a page structure, but CSS turns that structure into a usable interface that works across different screen sizes.",
    code: '.card {\n  padding: 24px;\n  border-radius: 16px;\n  display: flex;\n  gap: 16px;\n}\n\n@media (max-width: 600px) {\n  .card { flex-direction: column; }\n}',
    result: "The card gets spacing and layout rules, then changes to a vertical layout on smaller screens.",
  },
  "javascript-web": {
    what: "Learn how JavaScript controls a web page after it has loaded.",
    how: "JavaScript can find elements, listen for events, read user input, change text, create elements, and update the page without reloading it.",
    why: "This is what turns a static page into an application. Buttons, counters, menus, forms, and interactive dashboards all depend on this idea.",
    code: 'const button = document.querySelector("#add");\nconst output = document.querySelector("#count");\nlet count = 0;\n\nbutton.addEventListener("click", () => {\n  count++;\n  output.textContent = count;\n});',
    result: "Every click runs the function, increases the state, and updates what the user sees.",
  },
  projects: {
    what: "Learn how developers combine small concepts into complete interfaces.",
    how: "A project is broken into smaller pieces: structure, data, styling, interaction, and reusable components. Build one piece at a time and connect them together.",
    why: "Knowing individual syntax is different from building software. Projects teach you how the pieces work together.",
    code: 'const products = [\n  { name: "Starter", price: 9 },\n  { name: "Pro", price: 19 }\n];\n\nproducts.map(product =>\n  console.log(product.name, product.price)\n);',
    result: "The program stores structured data and processes each item. The same pattern can power cards, dashboards, and product lists.",
  },
  jsx: {
    what: "Learn how JSX lets you describe user interfaces directly inside JavaScript and how React components make interfaces reusable.",
    how: "A component is a JavaScript function that returns JSX. Props pass data into components, conditions choose what to render, and map() turns data into repeated UI.",
    why: "Modern React applications are built from reusable components. JSX connects JavaScript logic with the interface the user sees.",
    code: 'function UserCard({ name }) {\n  return (\n    <article>\n      <h2>Hello, {name}</h2>\n      <p>Welcome back.</p>\n    </article>\n  );\n}\n\nconst users = ["Alex", "Sam"];\nusers.map(user => <UserCard name={user} />);',
    result: "One reusable component can receive different data and produce multiple pieces of UI.",
  },
};

export default function CourseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const course = getCourse(id);

  if (!course) {
    return (
      <View className="flex-1 items-center justify-center bg-[#08101f]">
        <Text className="text-white">Course not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-[#08101f]"
      contentContainerStyle={{ padding: 20, paddingTop: 56, paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
    >
      <Link href="/courses" asChild>
        <Pressable className="mb-6 flex-row items-center">
          <ArrowLeft size={18} color="#94a3b8" />
          <Text className="ml-2 text-base font-bold text-slate-300">All courses</Text>
        </Pressable>
      </Link>

      <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#34D399]">
        <BookOpen size={25} color="#08101f" strokeWidth={3} />
      </View>

      <Text className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-[#34D399]">
        {course.level}
      </Text>
      <Text className="mt-2 text-4xl font-black text-white">{course.title}</Text>
      <Text className="mt-3 text-lg leading-7 text-slate-300">{course.description}</Text>

      <View className="mt-6 rounded-3xl border border-[#1f806e] bg-[#0d2a2c] p-5">
        <View className="flex-row items-center">
          <Lightbulb size={20} color="#34D399" />
          <Text className="ml-2 text-xl font-black text-white">How this course works</Text>
        </View>
        <Text className="mt-3 text-base leading-7 text-slate-300">
          First understand the idea. Then see how the computer uses it. Then study a small example. Finally, use that idea when building real software.
        </Text>

        <View className="mt-5 gap-3">
          <CourseStep number="01" title="Understand" text="Learn what the concept is and what problem it solves." />
          <CourseStep number="02" title="See how it works" text="Follow the flow of data, decisions, functions, and UI changes." />
          <CourseStep number="03" title="Study the example" text="Read a small piece of real code and understand what each part does." />
          <CourseStep number="04" title="Build with it" text="Use the concept later in practical projects and coding tasks." />
        </View>
      </View>

      <View className="mt-8">
        <Text className="text-2xl font-black text-white">Course curriculum</Text>
        <Text className="mt-1 text-base text-slate-400">
          Learn the concepts in order. No challenge list here — this page is your learning material.
        </Text>
      </View>

      <View className="mt-5 gap-4">
        {course.chapters.map((chapter, index) => {
          const lesson = lessons[chapter.id];

          return (
            <View key={chapter.id} className="rounded-3xl border border-slate-800 bg-[#101827] p-5">
              <View className="flex-row items-start">
                <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#123329]">
                  <Text className="font-black text-[#34D399]">{String(index + 1).padStart(2, "0")}</Text>
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-xl font-black text-white">{chapter.title}</Text>
                  <Text className="mt-1 text-base text-slate-400">{chapter.subtitle}</Text>
                </View>
              </View>

              <View className="mt-5">
                <SectionTitle title="What you will learn" />
                <Text className="mt-2 text-base leading-7 text-slate-300">
                  {lesson?.what ?? chapter.learn}
                </Text>

                <SectionTitle title="How it works" />
                <Text className="mt-2 text-base leading-7 text-slate-400">
                  {lesson?.how ?? chapter.learn}
                </Text>

                <SectionTitle title="Why developers use it" />
                <Text className="mt-2 text-base leading-7 text-slate-400">
                  {lesson?.why ?? "This concept is a building block used in real software."}
                </Text>

                <SectionTitle title="Example" icon={<Code2 size={15} color="#34D399" />} />
                <View className="mt-2 overflow-hidden rounded-2xl border border-slate-800 bg-[#080d18] p-4">
                  <Text className="font-mono text-sm leading-6 text-slate-300">
                    {lesson?.code ?? ""}
                  </Text>
                </View>

                <View className="mt-3 rounded-2xl bg-[#0b1d30] p-4">
                  <Text className="text-sm font-bold uppercase tracking-[0.12em] text-[#34D399]">What happens</Text>
                  <Text className="mt-1 text-base leading-6 text-slate-400">
                    {lesson?.result ?? "The code is processed by the browser or JavaScript runtime to produce the requested result."}
                  </Text>
                </View>

                <View className="mt-4 flex-row flex-wrap gap-2">
                  {chapter.skills.map((skill) => (
                    <View key={skill} className="rounded-full border border-slate-700 px-3 py-1.5">
                      <Text className="text-sm font-bold text-slate-300">{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View className="mt-6 rounded-3xl border border-slate-800 bg-[#101827] p-5">
        <View className="flex-row items-center">
          <CheckCircle2 size={19} color="#34D399" />
          <Text className="ml-2 text-base font-black text-white">The goal</Text>
        </View>
        <Text className="mt-2 text-sm leading-6 text-slate-400">
          By the end, you should understand not only what JavaScript and JSX syntax looks like, but why it works, how data moves through an application, and how developers turn these pieces into real websites and apps.
        </Text>
      </View>

      {(() => {
        const currentIndex = courses.findIndex((item) => item.id === course.id);
        const nextCourse = courses[currentIndex + 1];

        if (!nextCourse) {
          return (
            <View className="mt-5 rounded-3xl border border-slate-800 bg-[#101827] p-5">
              <Text className="text-xs font-bold uppercase tracking-[0.16em] text-[#34D399]">Course complete</Text>
              <Text className="mt-2 text-xl font-black text-white">You reached the end of the learning path.</Text>
              <Link href="/courses" asChild>
                <Pressable className="mt-4 rounded-2xl bg-[#34D399] px-4 py-4">
                  <Text className="text-center text-lg font-black text-[#08101f]">View all courses</Text>
                </Pressable>
              </Link>
            </View>
          );
        }

        return (
          <View className="mt-6">
            <Text className="mb-3 text-base font-bold text-slate-400">Ready for the next step?</Text>
            <Link href={{ pathname: "/course/[id]", params: { id: nextCourse.id } }} asChild>
              <Pressable className="rounded-3xl bg-[#34D399] px-5 py-5">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 pr-3">
                    <Text className="text-sm font-black uppercase tracking-[0.16em] text-[#064e3b]">Next course</Text>
                    <Text className="mt-1 text-xl font-black text-[#08101f]">{nextCourse.title}</Text>
                    <Text className="mt-1 text-base font-semibold text-[#0f5132]">Continue your learning path</Text>
                  </View>
                  <View className="h-12 w-12 items-center justify-center rounded-full bg-[#08101f]">
                    <ArrowRight size={24} color="#34D399" strokeWidth={3} />
                  </View>
                </View>
              </Pressable>
            </Link>
          </View>
        );
      })()}
    </ScrollView>
  );
}

function CourseStep({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <View className="flex-row items-center">
      <View className="h-8 w-8 items-center justify-center rounded-lg bg-[#123329]">
        <Text className="text-[10px] font-black text-[#34D399]">{number}</Text>
      </View>
      <View className="ml-3 flex-1">
        <Text className="text-sm font-black text-white">{title}</Text>
        <Text className="mt-0.5 text-xs leading-4 text-slate-400">{text}</Text>
      </View>
    </View>
  );
}

function SectionTitle({ title, icon }: { title: string; icon?: React.ReactNode }) {
  return (
    <View className="mt-5 flex-row items-center">
      {icon}
      <Text className={`${icon ? "ml-2" : ""} text-sm font-black text-white`}>{title}</Text>
    </View>
  );
}
