import * as constant from "../../constants/constants.js";

// Function to fetch posts try catch
export async function fetchPosts(page = 1) {
  try {
    const response = await fetch(
      `${constant.url}/posts?_embed&status=publish&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    constant.main.innerHTML =
      "<h2>Something went wrong, please try again later</h2>";
  }
}
