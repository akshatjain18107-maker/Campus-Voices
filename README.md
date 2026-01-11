# Campus-Voices

**#The problem:-**

College campuses function as complex ecosystems where thousands of students interact daily withmultiple administrative units such as academics, hostels, mess management, maintenance, and security. Due to this complexity, campus-related issues are frequent and often impact a large numberof students simultaneously. However, the way these issues are currently identified, reported, andevaluated is largely unorganized and inefficient.

One of the major problems is the absence of a centralized and trustworthy system to report student concerns. Students usually rely on informal platforms such as WhatsApp groups, Reddit threads, orpersonal communication to highlight issues. While these platforms allow quick discussion, they fail to act as a credible source of information. There is no verification of participants, no assurance that the feedback is coming from actual students, and no structured way to measure how widespread a particular issue is. 

Another critical challenge is the lack of quantifiable data. When an issue is reported, there is no reliable method to determine:
• How many students are affected
• Which category the issue belongs to
• How severe or urgent the problem is
• Whether the issue is recurring or temporary
Because of this, authorities are forced to depend on assumptions or manual investigations, which significantly increases the time required to understand the problem before any action can even begin.

Furthermore, colleges often have multiple approval layers and administrative flows. Without clear data and prioritization, these workflows become inefficient. Even genuine and high-impact issues get delayed because administrators must spend time filtering, verifying, and consolidating scattered information from multiple unofficial sources. This results in a long feedback loop where problems remain unresolved for extended periods.

Another overlooked aspect is the absence of transparency. Students are usually unaware of whether their concerns are shared by others or if the issue is even being acknowledged. This leads to repeated complaints, frustration, and a lack of confidence in the existing grievance-handling process.

Overall, the core problem lies in the disconnect between student experiences and institutional decision-making. Without a structured, data-backed, and reliable representation of student concerns, campuses struggle to identify priority issues efficiently. This not only wastes time and resources but also negatively impacts the overall student experience.

**#The Solution:-**

To address the lack of a credible, structured, and data-driven mechanism for handling campus issues, we propose a web-based platform that enables students to report problems and collectively prioritize them through a voting system.

The platform allows students to post campus-related issues in a centralized system instead of relying on informal and unverified channels. Each issue is categorized into predefined domains such as hostel, mess, academics, infrastructure, and safety. This categorization ensures that issues are wellorganized and easy to analyse.

To maintain relevance and authenticity, only students associated with a particular category can vote on issues related to that category. This ensures that feedback comes from genuinely affected users rather than random participants, improving the credibility of the data collected.

Students can vote on reported issues, and the total number of votes determines the priority level of each issue. Issues with higher votes are automatically marked as higher priority and are displayed more prominently on the platform. This creates a transparent and democratic process where the severity of a problem is determined collectively rather than subjectively.

The system dynamically ranks and displays issues based on priority, allowing both students and authorities to clearly see which problems are impacting the maximum number of students. This eliminates the need for manual filtering and lengthy verification processes, thereby saving significant time and effort.

For administrative bodies, the platform acts as a single source of verified and structured information. Authorities can view issues category-wise and priority-wise, enabling them to take action in an efficient and systematic manner. Since decisions are backed by real participation data, the chances of misjudging issue importance are significantly reduced.

Overall, the solution bridges the gap between student concerns and institutional action by providing a transparent, reliable, and data-backed system. It simplifies issue reporting, improves prioritization, and enables faster and more effective resolution of campus problems.

**#Simple Flowchart which explains our work flow :- **

<img width="427" height="615" alt="image" src="https://github.com/user-attachments/assets/567a56fd-22fa-4712-8ede-6df556917551" />

## 🚀 Planned Improvements (Round 2)

### 🔐 Authentication & User Management
- College Email ID / Roll Number based login
- OTP-based user verification
- Session / JWT-based authentication
- Role-based access (Students & Authorities)

### 🗳️ Issue Voting & Prioritization
- Students can upvote campus-related issues
- Real-time vote count display
- Automatic issue prioritization based on votes
- High-priority issues highlighted for faster action

### 🗂️ Categorized Issue Management
- Issues organized under predefined categories:
  - Hostel
  - Mess
  - Academics
  - Infrastructure
  - Safety
- Category-wise filtering and sorting

### 🛠️ Admin / Authority Dashboard
- Dedicated dashboard for college authorities
- View issues by category and priority
- Update issue status (Pending / In Progress / Resolved)
- Add official responses or remarks

### 🎨 UI/UX Enhancements
- Cleaner and more intuitive interface
- Fully responsive design
- Better form validation and user feedback

### 🔒 Security & Data Integrity
- Input validation and spam prevention
- Secure handling of user data
- Protected routes and access control

### 🔮 Future Scope
- Anonymous issue reporting
- Notification system (Email / In-App)
- Multi-college support

### Round - 2 :- 

## Proposed Solution

**Campus Voices** is a web-based platform that enables students to:
- Log in securely using **Email + OTP authentication**
- Select one or more **categories of concern**
- Raise campus-related issues
- Vote on issues within their selected categories
- View issue priority based on **votes and category importance**

### Safety-First Approach
- **Safety-related issues are always prioritized at the top**, regardless of vote count
- Safety issues are visually highlighted for immediate attention
- This ensures critical issues are never ignored

An **Admin Dashboard** allows administrators to:
- View all raised issues
- Resolve, reopen, or delete issues
- Automatically see safety issues prioritized

---

## System Architecture (High Level)

- **Frontend:** HTML, CSS, JavaScript  
- **Authentication:** Email + OTP (Nodemailer)  
- **Storage (Prototype):** Browser LocalStorage  
- **User Roles:** Student & Admin  


---

##  Prototype Details

- Fully functional frontend prototype
- Email-based OTP authentication
- Category-based voting and issue management
- Data stored using LocalStorage (for demo & prototype purposes)
- Designed to be easily extendable to backend + database

---

##  Security & Data Integrity

- OTP-based email authentication
- Email treated as unique user identity
- Category-based voting restriction
- One vote per issue per user
- Admin access protected using passkey
- Safety issues given highest priority

---

##  Key Features Summary

- ✔ Secure Email + OTP Login  
- ✔ Multi-category selection per user  
- ✔ Category-restricted voting  
- ✔ Safety issues always prioritized  
- ✔ Student Dashboard & Admin Dashboard  
- ✔ Real-time issue status updates  
- ✔ Clean, intuitive, and responsive UI  

---

##  Research Work & References

- OTP Authentication Best Practices  
  - Google Authentication Guidelines  
- Issue Prioritization Models  
  - ITIL Incident Priority Framework  
- UX Design for Civic Engagement Platforms  
- Nodemailer Documentation  
  - https://nodemailer.com/

---

##  Future Enhancements

- Backend integration (Node.js + Database)
- Real-time notifications for students and admins
- Analytics dashboard for issue trends
- Deployment on cloud platforms
- Mobile-friendly Progressive Web App (PWA)
- Role-based admin hierarchy

---

##  Additional Notes

- The project focuses on **problem-solving, system design, and data integrity**
- Safety-first prioritization makes it suitable for real-world campus deployment
- Built as a scalable prototype, ready for backend integration

---

##  Team / Developer

**Project Name:** Campus Voices  
**Developed By:** *(Add your name / team name)*  
**Role:** Full Stack (Prototype Development)

---

