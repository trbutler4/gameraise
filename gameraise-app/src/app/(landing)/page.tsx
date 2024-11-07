export default function Landing() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative h-screen w-full">
          <div className="absolute inset-0">
            <div className="absolute inset-0 flex items-center bg-secondary">
              <span className="z-10 ml-[4%] text-6xl font-bold text-white md:ml-[8%] lg:ml-[12%]">
                GET FUNDED
              </span>
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(-45deg, transparent 50%, #BEE9E8 50%)",
              }}
            >
              <span className="ml-[50%] text-6xl font-bold text-white">
                GET GAMING
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
