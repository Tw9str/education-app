export async function fetchCategoryExams(title) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/categories/${title}`,
      {
        cache: "no-store",
      }
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching exam:", error);
  }
}
