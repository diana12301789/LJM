import userStatus from "@/actions/users";
import { createClient, getUser } from "@/app/utils/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

//LoginForm
import LoginForm from "@/components/LoginForm";

export default async function page() {
  const user = await getUser();

  if (user) {
    const supabase = await createClient();

    const { data: userData } = await supabase
      .from("users")
      .select("formcompleted")
      .eq("id", user.id)
      .single();

    if (!userData?.formcompleted) {
      redirect("/volunteerForm");
    }

    const { status } = await userStatus();

    if (status === "pending") {
      redirect("/confirmation");
    } else if (status === "approved") {
      redirect("/dashboard/logged");
    } else if (status === "rejected") {
      redirect("/rejected");
    }
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2 py-10">
        <div className="w-[90%]">
          <h1 className="text-foreground mt-10 text-center font-serif text-3xl font-bold lg:text-4xl">
            Welcome to the volunteer Portal
          </h1>
          <p className="mt-2 text-center">
            Join our community of compassionate volunteers making a difference
            in end-of-life care.
          </p>
        </div>

        {/* ---------- LOGIN FORM ---------- */}
        <div className="mt-1 w-[90%] max-w-3xl flex justify-center">
          <LoginForm />
        </div>

        {/* ---------- VOLUNTEER LEVELS SECTION ---------- */}
        <div className="w-[90%] max-w-6xl mx-auto mt-20 mb-56 pb-28">
          <h2 className="text-foreground text-center font-serif text-3xl font-bold lg:text-4xl mb-12">
            Volunteer Levels
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Kindling */}
            <div className="bg-white shadow-lg p-8 rounded-xl border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold text-yellow-700 mb-3">🌱🟢 Kindling</h3>
              <p className="text-gray-700 leading-relaxed">
                New volunteers who are beginning their journey in helping the community.
              </p>
            </div>

            {/* Kindlers */}
            <div className="bg-white shadow-lg p-8 rounded-xl border-l-4 border-orange-500">
              <h3 className="text-xl font-bold text-orange-700 mb-3">🔥🟠 Kindlers</h3>
              <p className="text-gray-700 leading-relaxed">
                Volunteer organisers helping coordinate activities and support events.
              </p>
            </div>

            {/* Flames */}
            <div className="bg-white shadow-lg p-8 rounded-xl border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-red-600 mb-3">🔥🔴 Flames</h3>
              <p className="text-gray-700 leading-relaxed">
                Lead volunteers and ambassadors supporting major projects and initiatives.
              </p>
            </div>

            {/* Fire Keepers */}
            <div className="bg-white shadow-lg p-8 rounded-xl border-l-4 border-purple-600">
              <h3 className="text-xl font-bold text-purple-700 mb-3">🔥🟣 Fire Keepers</h3>
              <p className="text-gray-700 leading-relaxed">
                Senior volunteers and long-term supporters offering guidance and leadership.
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}