# React-Native-Uni-Project
Here you can find my first React Native uni project: a food delivery cross-platform mobile application

Next, here's the project outline:

Project: "Eat and Go"
Course: Mobile Computing
Version 1.0

Introduction
You have been hired by the Italian startup "Eat and Go," which specializes in delivering meals to customers. The startup stands out from the competition for its fast purchasing and delivery process. Instead of composing menus by selecting various dishes, users can directly purchase a pre-defined menu, which is delivered to the point of purchase in record time using a drone.

System Description
The system consists of a server (provided by the instructor) and a client, which must be developed by the students. The functionalities described below must be accessible through a mobile application.

Implicit Registration:
Each user is assigned a session ID (SID) that identifies them on the server. Upon the first launch, the application requests a session ID from the server and stores it persistently. In all communications between the client and server, the client includes its session ID.

Profile:
In the profile screen, users can set their personal data: first name and last name (two separate fields), the name displayed on the credit card (a single field for full name), credit card number (16 digits), card expiration date (two fields: one for the month and one for the year, the former with two digits and the latter with four), and credit card CVV (3 digits). The profile screen also allows users to view their last order.

Menu List:
Users can view a list of menus offered by nearby restaurants. Each menu displays the name, an image, the price, a brief description, and the estimated delivery time.

Menu Details:
After selecting a menu, users can view its details on a dedicated screen. This screen shows the same data as the list (with a larger image), a longer description, and the option to purchase the menu. A menu cannot be purchased if the user's profile is incomplete or if there is an ongoing order that has not yet been delivered.

Delivery Status:
After purchasing a menu, users can see the delivery status on a dedicated screen. This screen displays the menu name, the status (which can be "delivered" or "in delivery"), and the time (the estimated delivery time for ongoing orders or the time of delivery for completed orders). If the status is "delivered," the user can see the delivery point on a map (which corresponds to the point of purchase). If the status is "in delivery," the user sees on the map the delivery point (point of purchase), the starting point (restaurant where the drone departed), and the current location of the drone. The "delivery status" page updates automatically every 5 seconds.

Page Persistence:
The application remembers the last displayed page so that, if the app is terminated, it reloads the last page upon restarting.

The design of the navigation scheme and individual screens is at the students' discretion. Students can choose the graphical style they prefer and customize the interface elements' appearance.

Server Communication
The APIs provided by the server are documented and available at the following base URL:
https://develop.ewlab.di.unimi.it/mc/2425/
The documentation for all calls is also available at this address.

Simplifications and Technical Specifications
Note that the system is a prototype, so many aspects that are not strictly necessary are ignored. This includes:

Basic security techniques are used, and privacy protection methods are not implemented.
At present, only one menu can be ordered at a time. If you want to dine with friends, each person must place a separate order.
The client must support only one language (Italian or English, as chosen by the student). However, the implementation must be consistent in a single language.
All menu images are square.
The project adopts the following performance optimization technique: Each menu is associated with an identifier and an image version number. When the client requests a menu, the server responds with the menu data (including the identifier and image version) but without the image. The client must check if the image is stored locally. If not, it requests the image from the server, stores it locally, and displays it. Otherwise, it loads the image from local memory.
The server sends images in Base64 format. These images do not include the HTML prefix for images.
The maximum length for first and last names is 15 characters for each field. The maximum length for the credit card name field is 31 characters.
The application will be evaluated on a Pixel 7 device with API 34.
Important Notes
It is forbidden to upload images or other personal data of students or other individuals (all data must be fictional, especially credit card data).
Uploading inappropriate or copyrighted images and/or text is also prohibited. Similarly, using other users' session IDs is not allowed. Non-compliance with these rules will result in the responsible student being barred from taking exams for a number of sessions determined by the instructor, and the incident will be reported to the academic coordination council.

Testing
Three API calls are available that do not need to be implemented by the client but can be used by the programmer externally for:

Creating a menu.
Modifying a menu.
Deleting an order (useful if an order from a distant location was mistakenly placed, preventing further orders for a long time).
For testing purposes, the server considers any credit card starting with the digit 1 as valid. Note: This behavior simulates credit card validity checks and should not be implemented on the client side. Instead, the client must verify the syntactical validity of the credit card data (e.g., ensuring the card number is 16 digits).

New Versions of the Project
If corrections are necessary, updated versions of this document will be released. Students are responsible for ensuring their project complies with the latest version of the document.

