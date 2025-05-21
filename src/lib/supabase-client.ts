import { supabase } from "./supabase";
import { ClubData } from "../data/clubsData";

export async function fetchClubs(): Promise<ClubData[]> {
  try {
    const { data, error } = await supabase.from("clubs").select("*");

    if (error) {
      console.error("Error fetching clubs:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error in fetchClubs:", error);
    return [];
  }
}

export async function fetchClubById(id: string): Promise<ClubData | null> {
  try {
    const { data, error } = await supabase
      .from("clubs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching club with id ${id}:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Error in fetchClubById for id ${id}:`, error);
    return null;
  }
}

export async function fetchClubsByCategory(
  category: string,
): Promise<ClubData[]> {
  try {
    const { data, error } = await supabase
      .from("clubs")
      .select("*")
      .eq("category", category);

    if (error) {
      console.error(`Error fetching clubs with category ${category}:`, error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error(
      `Error in fetchClubsByCategory for category ${category}:`,
      error,
    );
    return [];
  }
}
