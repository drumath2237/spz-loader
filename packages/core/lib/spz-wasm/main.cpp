#include <emscripten.h>
#include <emscripten/bind.h>
#include <emscripten/val.h>

#include <vector>
#include <iterator>

#include "spz/src/cc/splat-types.h"
#include "spz/src/cc/splat-types.cc"

#include "spz/src/cc/load-spz.h"
#include "spz/src/cc/load-spz.cc"

using namespace std;
using namespace spz;
using namespace emscripten;

float hoge()
{
  GaussianCloud gs = {
      1, 0, false, {0.0, 0.0, 0.0}, {1.0, 1.0, 1.0}, {1.0, 0.0, 0.0, 0.0}, {1.0}, {1.0, 1.0, 1.0}, {}};

  vector<uint8_t> binGS;
  saveSpz(gs, &binGS);

  PackedGaussians unpackedGS = loadSpzPacked(binGS);

  return unpackedGS.numPoints;
}

GaussianCloud create_test(int points)
{
  GaussianCloud gs = {points};
  return gs;
}

vector<uint8_t> save_spz(int points)
{
  GaussianCloud gs = {points};

  vector<uint8_t> packed;
  saveSpz(gs, &packed);

  return packed;
}

GaussianCloud load_spz(const int gsPtr, const int length)
{
  auto pointer = (uint8_t *)gsPtr;
  auto spzBuffer = vector<uint8_t>(pointer, pointer + length);

  return spz::loadSpz(spzBuffer);
}

int vf32_ptr(vector<float> &v)
{
  return (int)(v.data());
}

EMSCRIPTEN_BINDINGS(my_module)
{
  emscripten::function("create_test", &create_test);
  emscripten::function("hoge", &hoge);
  emscripten::function("save_spz", &save_spz);
  emscripten::function("load_spz", &load_spz, allow_raw_pointers());
  emscripten::function("vf32_ptr", &vf32_ptr, allow_raw_pointers());

  register_vector<float>("vector<float>");
  register_vector<uint8_t>("vector<uint8_t>");

  value_object<GaussianCloud>("GaussianCloud")
      .field("numPoints", &GaussianCloud::numPoints)
      .field("shDegree", &GaussianCloud::shDegree)
      .field("antialiased", &GaussianCloud::antialiased)
      .field("positions", &GaussianCloud::positions)
      .field("scales", &GaussianCloud::scales)
      .field("rotations", &GaussianCloud::rotations)
      .field("alphas", &GaussianCloud::alphas)
      .field("colors", &GaussianCloud::colors)
      .field("sh", &GaussianCloud::sh);
}